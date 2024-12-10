class Api::V1::TweetsController < ApplicationController
  def index
    tweets = Tweet.recent.includes(:user)
    render json: tweets
  end
end
