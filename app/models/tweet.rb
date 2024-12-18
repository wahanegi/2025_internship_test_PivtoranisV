class Tweet < ApplicationRecord
  belongs_to :user
  has_many :likes, dependent: :destroy

  validates :content, presence: true, length: { maximum: 255 }

  scope :recent, -> { order(created_at: :desc) }
end
