FactoryBot.define do
  factory :comment do
    association :user
    association :tweet
    body { Faker::Lorem.paragraph[0, 255] }
  end
end
