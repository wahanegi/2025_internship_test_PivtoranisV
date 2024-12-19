class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!, only: [ :create, :update, :destroy ]

  def index
    tweet = Tweet.includes(:comments, comments: :user).find_by(id: params[:id])

    return render json: { error: "Tweet not found" }, status: :not_found unless tweet

    comments = tweet.comments.recent

    render json: CommentSerializer.new(comments).serializable_hash
  end

  def create
    comment = current_user.comments.build(comment_params)

    if comment.save
      render json: CommentSerializer.new(comment).serializable_hash, status: :created
    else
      render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
  end

  def destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :tweet_id)
  end
end
