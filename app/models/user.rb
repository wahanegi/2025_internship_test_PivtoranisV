class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :user_name, presence: true
  validates :user_name, uniqueness: true
  validates :user_name, length: { maximum: 15 }
  validates :user_name, format: {
  with: /\A[a-zA-Z0-9_]+\z/,
  message: "only allows letters, numbers, and underscores"
}
end
