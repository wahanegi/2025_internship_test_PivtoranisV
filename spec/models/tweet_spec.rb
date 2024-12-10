require 'rails_helper'

RSpec.describe Tweet, type: :model do
  let(:tweet) { create(:tweet) }

  it 'is expected to have a valid factory' do
    expect(tweet.valid?).to eq true
  end

  context 'Associations' do
    it { is_expected.to belong_to(:user) }
  end

  context 'Validation' do
    it { is_expected.to validate_presence_of(:content) }
    it { is_expected.to allow_value('You want to enjoy life, don"t you?!!').for(:content) }

    it { is_expected.to validate_length_of(:content).is_at_most(255) }

    it 'allows exactly 255 characters for the content' do
      tweet = build(:tweet, content: 'a' * 255)
      expect(tweet).to be_valid
    end

    it 'does not allow more than 255 characters for the content' do
      tweet = build(:tweet, content: 'a' * 256)
      expect(tweet).not_to be_valid
    end

    it 'is invalid without content' do
      user = create(:user)
      tweet = build(:tweet, user:, content: nil)
      expect(tweet).not_to be_valid
    end

    it 'is invalid without a user' do
      tweet = build(:tweet, user: nil)
      expect(tweet).not_to be_valid
      expect(tweet.errors[:user]).to include("must exist")
    end

    it 'is invalid with blank content' do
      tweet = build(:tweet, content: '   ')
      expect(tweet).not_to be_valid
      expect(tweet.errors[:content]).to include("can't be blank")
    end
  end

  context 'Tweets order' do
    it 'orders tweets from most recent to oldest' do
      older_tweet = create(:tweet, created_at: 1.day.ago)
      newer_tweet = create(:tweet, created_at: Time.now)
      expect(Tweet.recent).to eq([ newer_tweet, older_tweet ])
    end
  end
end
