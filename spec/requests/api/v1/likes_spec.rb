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

  describe "POST /create" do
    include Devise::Test::IntegrationHelpers

    let!(:user) { create(:user) }
    let!(:tweet) { create(:tweet) }
    let(:valid_attributes) { { tweet_id: tweet.id } }
    let(:invalid_attributes) { { tweet_id: "" } }
    let(:headers) { { "Content-Type" => "application/json" } }
    let(:json_response) { JSON.parse(response.body) }

    before { sign_in user }

    context "when the request is valid" do
      it "returns http status created" do
        post "/api/v1/likes", params: valid_attributes.to_json, headers: headers
        expect(response).to have_http_status(:created)
      end

      it "creates a new like" do
        expect {
          post "/api/v1/likes", params: valid_attributes.to_json, headers: headers
        }.to change(Like, :count).by(1)
      end
    end

    context "when the request is invalid" do
      before { post "/api/v1/likes", params: invalid_attributes.to_json, headers: headers }

      it "does not create a new like" do
        expect {
          post "/api/v1/likes", params: invalid_attributes.to_json, headers: headers
        }.not_to change(Like, :count)
      end

      it "returns http status unprocessable entity" do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns error messages in the response" do
        expect(json_response['errors']).to include("Tweet can't be blank")
      end
    end

    context "when the user tries to like the same tweet twice" do
      before do
        create(:like, user: user, tweet: tweet)
      end

      it "does not create a duplicate like" do
        expect {
          post "/api/v1/likes", params: valid_attributes.to_json, headers: headers
        }.not_to change(Like, :count)
      end

      it "returns http status unprocessable entity" do
        post "/api/v1/likes", params: valid_attributes.to_json, headers: headers
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns a validation error message" do
        post "/api/v1/likes", params: valid_attributes.to_json, headers: headers
        expect(json_response['errors']).to include("User has already been taken")
      end
    end
  end

  describe "DELETE /destroy" do
    include Devise::Test::IntegrationHelpers

    let!(:user) { create(:user) }
    let!(:like) { create(:like) }
    let(:headers) { { "Content-Type" => "application/json" } }
    let(:json_response) { JSON.parse(response.body) }

    before { sign_in user }

    context "when the like exists" do
      it "returns http status ok" do
        delete "/api/v1/likes/#{like.id}", headers: headers
        expect(response).to have_http_status(:ok)
      end

      it "deletes the like" do
        expect {
          delete "/api/v1/likes/#{like.id}", headers: headers
        }.to change(Like, :count).by(-1)
      end
    end

    context "when the like does not exist" do
      it "returns http status not found" do
        delete "/api/v1/likes/0", headers: headers
        expect(response).to have_http_status(:not_found)
      end

      it "returns an error message" do
        delete "/api/v1/likes/0", headers: headers
        expect(json_response["error"]).to eq("Like not found")
      end
    end

    context "when the like belongs to another user" do
      let!(:other_user) { create(:user) }
      let!(:other_like) { create(:like, user: other_user, tweet: tweet) }

      it "does not delete the like" do
        expect {
          delete "/api/v1/likes/#{other_like.id}", headers: headers
        }.not_to change(Like, :count)
      end
    end
  end
end
