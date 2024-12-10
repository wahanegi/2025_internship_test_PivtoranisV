class TweetSerializer
  include JSONAPI::Serializer
  attributes :content, :created_at
  belongs_to :user
end
