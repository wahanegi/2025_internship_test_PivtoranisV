class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable

  has_many :tweets, dependent: :destroy
  has_many :likes, dependent: :destroy
  has_many :comments, dependent: :destroy

  USER_NAME_FORMAT = /\A[a-zA-Z0-9_]+\z/
  PASSWORD_SYMBOL_FORMAT = /\A(?=.*[^\w\s])[^\s]*\z/
  PASSWORD_REPEATED_CHAR_FORMAT = /\A(?!.*(.)\1\1).*\z/

  validates :user_name, presence: true, uniqueness: true, length: { maximum: 15 },
            format: { with: USER_NAME_FORMAT, message: "only allows letters, numbers, and underscores" }

  validates :email, presence: true, uniqueness: { case_sensitive: false },
            format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, message: "must be a valid email format" }

  validates :password, length: { minimum: 6 },
            format: { with: PASSWORD_SYMBOL_FORMAT, message: "must contain at least one symbol" }
  validates :password, format: { with: PASSWORD_REPEATED_CHAR_FORMAT, message: "cannot repeat the same character more than twice" }
end
