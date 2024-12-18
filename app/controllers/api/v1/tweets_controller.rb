class Api::V1::TweetsController < ApplicationController
  before_action :authenticate_user!, only: [ :create, :update, :destroy ]
  before_action :set_tweet, only: [ :show, :update, :destroy ]

  def index
    tweets = Tweet.recent.includes(:user)
    render json: TweetSerializer.new(tweets, include: [ :user ]).serializable_hash
  end

  def show
    return render json: { error: "Tweet not found" }, status: :not_found unless @tweet

    render json: TweetSerializer.new(@tweet, include: [ :user ]).serializable_hash
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
    return render json: { error: "You are not authorized to edit this tweet." }, status: :unauthorized unless authorized_user?

    if @tweet.update(tweets_params)
     render json: TweetSerializer.new(@tweet).serializable_hash
    else
      render json: { errors: @tweet.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    return render json: { error: "You are not authorized to delete this tweet." }, status: :unauthorized unless authorized_user?

    @tweet.destroy
    render json: { message: "Tweet deleted successfully." }, status: :ok
  end


  private

  def tweets_params
    params.require(:tweet).permit(:content)
  end

  def set_tweet
    @tweet = Tweet.find_by(id: params[:id])
  end

  def authorized_user?
    current_user.id == @tweet.user_id
  end
end
