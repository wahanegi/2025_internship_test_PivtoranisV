require 'rails_helper'

RSpec.describe TweetSerializer, type: :serializer do
  let(:user) { create(:user) }
  let(:tweet) { create(:tweet) }
  let(:serialized_tweet) { TweetSerializer.new(tweet).serializable_hash }

  it 'includes the correct attributes' do
    expect(serialized_tweet[:data][:attributes]).to include(
      content: tweet.content,
      created_at: tweet.created_at.iso8601
    )
  end

  it 'includes the user relationship' do
    expect(serialized_tweet[:data][:relationships][:user][:data]).to include(
      id: tweet.user.id.to_s,
      type: :user
    )
  end
end
