class UserSerializer
  include JSONAPI::Serializer
  attributes :user_name
  has_many :tweets
  has_many :likes

  attribute :liked_tweets_with_ids do |user|
    user.likes.map { |like| { tweet_id: like.tweet_id, like_id: like.id } }
  end
end
