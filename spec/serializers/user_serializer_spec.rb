require 'rails_helper'

RSpec.describe UserSerializer, type: :serializer do
  let(:user) { create(:user) }
  let!(:tweets) { create(:tweet, user:) }
  let(:serialized_user) { UserSerializer.new(user).serializable_hash }

  it 'includes the correct attributes' do
    expect(serialized_user[:data][:attributes]).to include(
      user_name: user.user_name
    )
  end

  it 'includes the tweets relationship' do
    expect(serialized_user[:data][:relationships][:tweets][:data]).to include(
      id: tweets.id.to_s,
      type: :tweet
    )
  end
end
