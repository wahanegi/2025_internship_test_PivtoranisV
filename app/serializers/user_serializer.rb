class UserSerializer
  include JSONAPI::Serializer
  attributes :user_name
  has_many :tweets
  has_many :likes
end
