require 'rails_helper'

RSpec.describe "Api::V1::Comments", type: :request do
  describe "GET /index" do
    let!(:user1) { create(:user) }
    let!(:user2) { create(:user) }
    let!(:tweet) { create(:tweet) }
    let!(:comment1) { create(:comment, tweet: tweet, user: user1) }
    let!(:comment2) { create(:comment, tweet: tweet, user: user2) }
    let(:json_response) { JSON.parse(response.body) }

    before { get "/api/v1/comments", params: { id: tweet.id } }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "returns JSON format" do
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end

    it "returns a list of all comments" do
      expect(json_response['data'].size).to eq(2)
    end

    it "returns comments in the correct order (most recent first)" do
      expect(json_response['data'][0]['id']).to eq(comment2.id.to_s)
      expect(json_response['data'][1]['id']).to eq(comment1.id.to_s)
    end

    it "returns the correct comment body" do
      expect(json_response['data'][0]['attributes']['body']).to eq(comment2.body)
      expect(json_response['data'][1]['attributes']['body']).to eq(comment1.body)
    end

    it "returns in correct JSON:API format" do
      expect(json_response).to have_key('data')
      expect(json_response['data'].first).to have_key('attributes')
      expect(json_response['data'].first).to have_key('relationships')
    end

    context "when there are no comments" do
      it "returns an empty data array" do
        Comment.delete_all
        get "/api/v1/comments", params: { id: tweet.id }
        expect(json_response['data']).to eq([])
      end
    end

    context "when the tweet does not exist" do
      it "returns a 404 Not Found" do
        get "/api/v1/comments", params: { id: 0 }
        expect(response).to have_http_status(:not_found)
        expect(json_response['error']).to eq("Tweet not found")
      end
    end
  end
end
