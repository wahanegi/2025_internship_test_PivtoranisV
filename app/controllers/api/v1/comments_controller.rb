class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!, only: [ :create, :update, :destroy ]
  before_action :set_comment, only: [ :update, :destroy ]

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
    return render json: { error: "You are not authorized to edit this comment." }, status: :unauthorized unless authorized_user?

    if @comment.update(comment_params)
      render json: CommentSerializer.new(@comment).serializable_hash
    else
      render json: { errors: @comment.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :tweet_id)
  end

  def set_comment
    @comment = Comment.find_by(id: params[:id])
  end

  def authorized_user?
    current_user.id == @comment.user_id
  end
end
