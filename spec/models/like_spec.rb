require 'rails_helper'

RSpec.describe Like, type: :model do
  let(:like) { create(:like) }

  it 'is expected to have a valid factory' do
  expect(like.valid?).to eq true
end

  context 'Associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:tweet) }
  end

  context 'Validation' do
    it { is_expected.to validate_presence_of(:user_id) }
    it { is_expected.to validate_presence_of(:tweet_id) }

    it 'is invalid without a user' do
      like =  build(:like, user: nil)
      expect(like).not_to be_valid
      expect(like.errors[:user]).to include("must exist")
    end

    it 'is invalid without a tweet' do
      like = build(:like, tweet: nil)
      expect(like).not_to be_valid
      expect(like.errors[:tweet]).to include("must exist")
    end

    it 'is invalid if a user likes the same tweet twice' do
      user = create(:user)
      tweet = create(:tweet)
      create(:like, user: user, tweet: tweet)

      duplicate_like = build(:like, user: user, tweet: tweet)
      expect(duplicate_like).not_to be_valid
      expect(duplicate_like.errors[:tweet_id]).to include('has already been taken')
    end
  end
end
