class UserSerializer
  include JSONAPI::Serializer
  attributes :user_name
  has_many :tweets
  has_many :likes

  attribute :liked_tweet_ids do |user|
    user.likes.map(&:tweet_id)
  end
end
