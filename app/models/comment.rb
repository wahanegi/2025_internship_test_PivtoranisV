class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :tweet

  validates :body, presence: true, length: { maximum: 255 }

  scope :recent, -> { order(created_at: :desc) }
end
