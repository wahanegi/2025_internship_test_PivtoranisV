class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def index
    if current_user
      user = User.includes(:likes).find(current_user.id)
      render json: UserSerializer.new(user).serializable_hash
    else
      render json: { error: "Not signed in" }, status: :unauthorized
    end
  end
end
