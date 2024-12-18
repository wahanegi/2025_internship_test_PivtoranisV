class Like < ApplicationRecord
  belongs_to :user
  belongs_to :tweet

  validates :user_id, :tweet_id, presence: true
  validates :user_id, uniqueness: { scope: :tweet_id }
end
