FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    user_name { Faker::Internet.username(specifier: 1..15) }
    password { 'password' }
    password_confirmation { 'password' }
  end
end
