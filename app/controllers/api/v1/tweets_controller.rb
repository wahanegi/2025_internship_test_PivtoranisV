class Api::V1::TweetsController < ApplicationController
  before_action :authenticate_user!, only: [ :create, :update ]
  before_action :set_tweet, only: [ :show, :update ]

  def index
    tweets = Tweet.recent.includes(:user)
    render json: TweetSerializer.new(tweets, include: [ :user ]).serializable_hash
  end

  def show
    if @tweet
      render json: TweetSerializer.new(@tweet, include: [ :user ]).serializable_hash
    else
      render json: { error: "Tweet not found" }, status: :not_found
    end
  end

  def create
    tweet = current_user.tweets.build(tweets_params)

    if tweet.save
      render json: TweetSerializer.new(tweet).serializable_hash, status: :created
    else
      render json: { errors: tweet.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if current_user != @tweet.user
      render json: { error: "You are not authorized to edit this tweet." }, status: :unauthorized
    elsif @tweet.update(tweets_params)
     render json: TweetSerializer.new(@tweet).serializable_hash
    else
      render json: { errors: @tweet.errors.full_messages }, status: :unprocessable_entity
    end
  end


  private

  def tweets_params
    params.require(:tweet).permit(:content)
  end

  def set_tweet
    @tweet = Tweet.find_by(id: params[:id])
  end
end
