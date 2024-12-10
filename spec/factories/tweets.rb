FactoryBot.define do
  factory :tweet do
    content { Faker::Quote.matz[0..254] }
    association :user
  end
end
