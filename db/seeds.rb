Tweet.destroy_all
User.destroy_all

users = Array.new(5) do
  User.create!(
    email: Faker::Internet.unique.email,
    user_name: Faker::Internet.unique.username(specifier: 1..15).gsub(/[^a-zA-Z0-9_]/, ''),
    password: '@password',
    password_confirmation: '@password',
    confirmed_at: Time.current
  )
end

users.each do |user|
  rand(1..3).times do
    user.tweets.create!(
      content: Faker::Quote.matz[0, 255]
    )
  end
end
