FactoryBot.define do
  factory :user do
    email { Faker::Internet.unique.email }
    user_name { Faker::Internet.unique.username(specifier: 1..15).gsub(/[^a-zA-Z0-9_]/, '') }
    password { '@password' }
    password_confirmation { '@password' }
  end
end
