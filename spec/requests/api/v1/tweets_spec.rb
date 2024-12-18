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

  describe "GET show/:id" do
    let!(:user) { create(:user) }
    let!(:tweet) { create(:tweet) }
    let(:json_response) { JSON.parse(response.body) }

    before { get "/api/v1/tweets/#{tweet.id}" }

    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "returns JSON format" do
      expect(response.content_type).to eq("application/json; charset=utf-8")
    end

    it "returns just one tweet" do
      expect(json_response['data']).not_to be_nil
      expect(json_response['data']['id']).to eq(tweet.id.to_s)
    end

    it "returns the correct tweet content" do
      expect(json_response['data']['attributes']['content']).to eq(tweet.content)
    end

    it "responds in JSON:API format" do
      expect(json_response).to have_key('data')
      expect(json_response['data']).to have_key('attributes')
      expect(json_response['data']).to have_key('relationships')
      expect(json_response['data']['relationships']).to have_key('user')
    end
    context "when the tweet does not exist" do
      before { get "/api/v1/tweets/not_existing_id" }

      it "returns http not found" do
        expect(response).to have_http_status(:not_found)
      end

      it "returns an error message" do
        expect(json_response['error']).to eq('Tweet not found')
      end
    end
  end

  describe "POST /create" do
    include Devise::Test::IntegrationHelpers
    let!(:user) { create(:user) }
    let(:valid_attributes) { { content: "This is a valid tweet!", user_id: user.id } }
    let(:invalid_attributes) { { content: "", user_id: user.id } }
    let(:headers) { { "Content-Type" => "application/json" } }
    let(:json_response) { JSON.parse(response.body) }

    before do
      sign_in user
    end

    context "when the request is valid" do
      before { post "/api/v1/tweets", params: valid_attributes.to_json, headers: headers }

      it "returns http status created" do
        expect(response).to have_http_status(:created)
      end

      it "creates a new tweet" do
        expect {
          post "/api/v1/tweets", params: valid_attributes.to_json, headers: headers
        }.to change(Tweet, :count).by(1)
      end

      it "returns the correct created tweet content" do
        expect(json_response['data']['attributes']['content']).to eq(valid_attributes[:content])
      end

      it "returns the created tweet in JSON:API format" do
        expect(json_response).to have_key('data')
        expect(json_response['data']).to have_key('attributes')
        expect(json_response['data']).to have_key('relationships')
      end
    end

    context "when the request is invalid" do
      before { post "/api/v1/tweets", params: invalid_attributes.to_json, headers: headers }

      it "does not create a new tweet" do
        expect {
          post "/api/v1/tweets", params: invalid_attributes.to_json, headers: headers
        }.not_to change(Tweet, :count)
      end

      it "returns http status unprocessable entity" do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns error messages in the response" do
        expect(json_response['errors']).to include("Content can't be blank")
      end
    end
  end

  describe "PATCH update/:id" do
    include Devise::Test::IntegrationHelpers
    let!(:user) { create(:user) }
    let!(:other_user) { create(:user) }
    let!(:tweet) { create(:tweet, user: user, content: "Original content") }
    let(:valid_attributes) { { content: "Updated content" } }
    let(:invalid_attributes) { { content: "" } }
    let(:headers) { { "Content-Type" => "application/json" } }
    let(:json_response) { JSON.parse(response.body) }

    before { sign_in user }

    context "when the request is valid" do
      before { patch "/api/v1/tweets/#{tweet.id}", params: valid_attributes.to_json, headers: headers }

      it "returns http status success" do
        expect(response).to have_http_status(:success)
      end

      it "updates the tweet content" do
        expect(tweet.reload.content).to eq(valid_attributes[:content])
      end

      it "returns the updated tweet in JSON:API format" do
        expect(json_response).to have_key('data')
        expect(json_response['data']).to have_key('attributes')
        expect(json_response['data']['attributes']['content']).to eq(valid_attributes[:content])
      end
    end

    context "when the request is invalid" do
      before { patch "/api/v1/tweets/#{tweet.id}", params: invalid_attributes.to_json, headers: headers }

      it "does not update the tweet content" do
        expect(tweet.reload.content).to eq("Original content")
      end

      it "returns http status unprocessable entity" do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns error messages in the response" do
        expect(json_response['errors']).to include("Content can't be blank")
      end
    end

    context "when the user is unauthorized" do
      before do
        sign_out user
        sign_in other_user
        patch "/api/v1/tweets/#{tweet.id}", params: valid_attributes.to_json, headers: headers
      end

      it "does not update the tweet" do
        expect(tweet.reload.content).to eq("Original content")
      end

      it "returns http status unauthorized" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns an error message" do
        expect(json_response['error']).to eq("You are not authorized to edit this tweet.")
      end
    end
  end
end
