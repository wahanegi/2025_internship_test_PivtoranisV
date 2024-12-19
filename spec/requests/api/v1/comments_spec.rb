require 'rails_helper'

RSpec.describe "Api::V1::Comments", type: :request do
  describe "GET /index" do
    let!(:user1) { create(:user) }
    let!(:user2) { create(:user) }
    let!(:tweet) { create(:tweet) }
    let!(:comment1) { create(:comment, tweet: tweet, user: user1) }
    let!(:comment2) { create(:comment, tweet: tweet, user: user2) }
    let(:json_response) { JSON.parse(response.body) }

    before { get "/api/v1/tweets/#{tweet.id}/comments" }

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
        get "/api/v1/tweets/#{tweet.id}/comments"
        expect(json_response['data']).to eq([])
      end
    end

    context "when the tweet does not exist" do
      it "returns a 404 Not Found" do
        get "/api/v1/tweets/random_id/comments"
        expect(response).to have_http_status(:not_found)
        expect(json_response['error']).to eq("Tweet not found")
      end
    end
  end

  describe "POST /create" do
    include Devise::Test::IntegrationHelpers
    let!(:user) { create(:user) }
    let!(:tweet) { create(:tweet) }
    let(:valid_attributes) { { body: "This is a valid comment", tweet_id: tweet.id } }
    let(:invalid_attributes) { { body: "", tweet_id: tweet.id  } }
    let(:headers) { { "Content-Type" => "application/json" } }
    let(:json_response) { JSON.parse(response.body) }

    before do
      sign_in user
    end

    context "when the request is valid" do
      before { post "/api/v1/comments", params: valid_attributes.to_json, headers: headers }

      it "returns http status created" do
        expect(response).to have_http_status(:created)
      end

      it "creates a new comment" do
        expect {
          post "/api/v1/comments", params: valid_attributes.to_json, headers: headers
        }.to change(Comment, :count).by(1)
      end

      it "returns the correct created comment body" do
        expect(json_response['data']['attributes']['body']).to eq(valid_attributes[:body])
      end

      it "returns the created comment in JSON:API format" do
        expect(json_response).to have_key('data')
        expect(json_response['data']).to have_key('attributes')
        expect(json_response['data']).to have_key('relationships')
      end
    end

    context "when the request is invalid" do
      before { post "/api/v1/comments", params: invalid_attributes.to_json, headers: headers }

      it "does not create a new comment" do
        expect {
          post "/api/v1/comments", params: invalid_attributes.to_json, headers: headers
        }.not_to change(Comment, :count)
      end

      it "returns http status unprocessable entity" do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns error messages in the response" do
        expect(json_response['errors']).to include("Body can't be blank")
      end
    end
  end

  describe "PATCH update/:id" do
    include Devise::Test::IntegrationHelpers
    let!(:user) { create(:user) }
    let!(:other_user) { create(:user) }
    let!(:tweet) { create(:tweet, user: user) }
    let!(:comment) { create(:comment, user: user, tweet: tweet, body: "Original comment") }
    let(:valid_attributes) { { body: "Updated comment", tweet_id: tweet.id  } }
    let(:invalid_attributes) { { body: "", tweet_id: tweet.id  } }
    let(:headers) { { "Content-Type" => "application/json" } }
    let(:json_response) { JSON.parse(response.body) }

    before { sign_in user }

    context "when the request is valid" do
      before { patch "/api/v1/comments/#{comment.id}", params: valid_attributes.to_json, headers: headers }

      it "returns http status success" do
        expect(response).to have_http_status(:success)
      end

      it "updates the comment body" do
        expect(comment.reload.body).to eq(valid_attributes[:body])
      end

      it "returns the updated comment in JSON:API format" do
        expect(json_response).to have_key('data')
        expect(json_response['data']).to have_key('attributes')
        expect(json_response['data']['attributes']['body']).to eq(valid_attributes[:body])
      end
    end

    context "when the request is invalid" do
      before { patch "/api/v1/comments/#{comment.id}", params: invalid_attributes.to_json, headers: headers }

      it "does not update the comment body" do
        expect(comment.reload.body).to eq("Original comment")
      end

      it "returns http status unprocessable entity" do
        expect(response).to have_http_status(:unprocessable_entity)
      end

      it "returns error messages in the response" do
        expect(json_response['errors']).to include("Body can't be blank")
      end
    end

    context "when the user is unauthorized" do
      before do
        sign_out user
        sign_in other_user
        patch "/api/v1/comments/#{comment.id}", params: valid_attributes.to_json, headers: headers
      end

      it "does not update the comment" do
        expect(comment.reload.body).to eq("Original comment")
      end

      it "returns http status unauthorized" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns an error message" do
        expect(json_response['error']).to eq("You are not authorized to perform this action.")
      end
    end
  end

  describe "DELETE /destroy/:id" do
    include Devise::Test::IntegrationHelpers
    let!(:user) { create(:user) }
    let!(:other_user) { create(:user) }
    let!(:tweet) { create(:tweet, user: user) }
    let!(:comment) { create(:comment, user: user, tweet: tweet) }
    let(:headers) { { "Content-Type" => "application/json" } }
    let(:json_response) { JSON.parse(response.body) }

    before { sign_in user }

    context "when the user is authorized" do
      before { delete "/api/v1/comments/#{comment.id}", headers: headers }

      it "returns http status success" do
        expect(response).to have_http_status(:success)
      end

      it "deletes the comment" do
        expect(Comment.find_by(id: comment.id)).to be_nil
      end

      it "returns a success message" do
        expect(json_response['message']).to eq("Comment deleted successfully.")
      end
    end

    context "when the user is unauthorized" do
      before do
        sign_out user
        sign_in other_user
        delete "/api/v1/comments/#{comment.id}", headers: headers
      end

      it "does not delete the comment" do
        expect(Comment.find_by(id: comment.id)).not_to be_nil
      end

      it "returns http status unauthorized" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns an error message" do
        expect(json_response['error']).to eq("You are not authorized to perform this action.")
      end
    end
  end
end
