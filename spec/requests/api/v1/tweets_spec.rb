require 'rails_helper'

RSpec.describe "Api::V1::Tweets", type: :request do
  describe "GET /index" do
    let!(:user) { create(:user) }
    let!(:tweet1) { create(:tweet, user:, created_at: 2.days.ago) }
    let!(:tweet2) { create(:tweet, user:, created_at: 1.day.ago) }
    let(:json_response) { JSON.parse(response.body) }

    before { get "/api/v1/tweets" }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "returns JSON format" do
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end

    it "returns a list of all tweets" do
      expect(json_response['data'].size).to eq(2)
    end

    it "returns tweets in the correct order (most recent first)" do
      expect(json_response['data'][0]['id']).to eq(tweet2.id.to_s)
      expect(json_response['data'][1]['id']).to eq(tweet1.id.to_s)
    end

    it "returns the correct tweet content" do
      expect(json_response['data'][0]['attributes']['content']).to eq(tweet2.content)
      expect(json_response['data'][1]['attributes']['content']).to eq(tweet1.content)
    end

    it "responds in JSON:API format" do
      expect(json_response).to have_key('data')
      expect(json_response['data'].first).to have_key('attributes')
      expect(json_response['data'].first).to have_key('relationships')
    end

    context "when there are no tweets" do
      before do
        Tweet.delete_all
        get "/api/v1/tweets"
      end

      it "returns an empty data array" do
        expect(json_response['data']).to eq([])
      end
    end
  end
end
