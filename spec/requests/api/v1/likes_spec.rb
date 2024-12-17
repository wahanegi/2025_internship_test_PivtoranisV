require 'rails_helper'

RSpec.describe "Api::V1::Likes", type: :request do
  describe "GET /index" do
    let!(:user) { create(:user) }
    let!(:user2) { create(:user) }
    let!(:tweet1) { create(:tweet, user: user) }
    let!(:tweet2) { create(:tweet, user: user) }
    let!(:like1) { create(:like, user: user, tweet: tweet1) }
    let!(:like2) { create(:like, user: user2, tweet: tweet1) }
    let!(:like3) { create(:like, user: user, tweet: tweet2) }

    let(:json_response) { JSON.parse(response.body) }

    before { get "/api/v1/likes" }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "returns JSON format" do
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end

    it "returns number of likes for each tweet" do
      expect(json_response).to eq({
      tweet1.id.to_s => 2,
      tweet2.id.to_s => 1
    })
    end

    context "when there are no likes" do
      before do
        Like.delete_all
        get "/api/v1/likes"
      end

      it "returns an empty hash" do
        expect(json_response).to eq({})
      end
    end
  end
  describe "GET /create" do
    it "returns http success" do
      get "/api/v1/likes/create"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /destroy" do
    it "returns http success" do
      get "/api/v1/likes/destroy"
      expect(response).to have_http_status(:success)
    end
  end
end
