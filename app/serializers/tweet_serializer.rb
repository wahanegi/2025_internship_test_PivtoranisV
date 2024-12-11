class TweetSerializer
  include JSONAPI::Serializer
  attributes :content

  attribute :created_at do |object|
    object.created_at.iso8601
  end
  belongs_to :user
end
