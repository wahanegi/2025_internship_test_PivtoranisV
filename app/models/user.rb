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
  validates :password, length: { minimum: 6 }
  validates :password, format: {
    with: /\A(?=.*[^\w\s])[^\s]*\z/,
    message: "must contain at least one symbol" }
  validates :password, format: {
    with: /\A(?!.*(.)\1\1).*\z/,
    message: "cannot repeat the same character more than twice" }
end
