require 'rails_helper'

RSpec.describe "Api::V1::Users", type: :request do
  describe "GET /api/v1/users" do
    include Devise::Test::IntegrationHelpers

    let!(:user) { create(:user) }

    context "when the user is logged in" do
      before do
        sign_in user
        get "/api/v1/users"
      end

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "returns the logged-in user's details" do
        json_response = JSON.parse(response.body)
        expect(json_response['data']['attributes']['user_name']).to eq(user.user_name)
      end
    end

    context "when the user is not logged in" do
      before { get "/api/v1/users" }

      it "redirects to the login page" do
        expect(response).to have_http_status(:found)
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
