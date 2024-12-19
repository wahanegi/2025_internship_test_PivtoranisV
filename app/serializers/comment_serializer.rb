class CommentSerializer
  include JSONAPI::Serializer
  attributes :body

  attribute :created_at do |object|
    object.created_at.iso8601
  end

  attribute :user_name do |object|
    object.user.user_name
  end

  belongs_to :user
end
