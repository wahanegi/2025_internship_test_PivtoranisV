FactoryBot.define do
  factory :tweet do
    content { Faker::Quote.matz[0, 255] }
    association :user
  end
end
