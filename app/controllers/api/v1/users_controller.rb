class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user
      render json: UserSerializer.new(current_user).serializable_hash
    else
      render json: { error: "Not signed in" }, status: :unauthorized
    end
  end
end
