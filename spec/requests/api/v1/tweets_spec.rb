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
end
