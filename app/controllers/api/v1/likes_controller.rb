class Api::V1::LikesController < ApplicationController
  def index
    likes_count = Like.group(:tweet_id).count
    render json: likes_count
  end

  def create
  end

  def destroy
  end
end
