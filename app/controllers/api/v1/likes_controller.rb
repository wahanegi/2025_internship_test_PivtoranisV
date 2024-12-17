class Api::V1::LikesController < ApplicationController
  before_action :authenticate_user!, only: [ :create, :destroy ]

  def index
    likes_count = Like.group(:tweet_id).count
    render json: likes_count
  end

  def create
    like = current_user.likes.build(likes_params)
    if like.save
      render json: like, status: :created
    else
      render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private

  def likes_params
    params.require(:like).permit(:tweet_id)
  end
end
