FactoryBot.define do
  factory :comment do
    user { nil }
    tweet { nil }
    body { "MyString" }
  end
end
