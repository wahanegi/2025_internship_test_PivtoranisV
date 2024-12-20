require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  it 'is expected to have a valid factory' do
    expect(user.valid?).to eq true
  end

  context 'Associations' do
    let!(:tweet1) { create(:tweet, user: user) }
    let!(:tweet2) { create(:tweet, user: user) }

    it { is_expected.to have_many(:tweets) }
    it { is_expected.to have_many(:likes).dependent(:destroy) }
    it { is_expected.to have_many(:comments).dependent(:destroy) }

    it 'destroys associated tweets when a user is destroyed' do
    expect { user.destroy }.to change(Tweet, :count).by(-2)
    end
  end

  context 'Validation' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to allow_value('valid.email@gmail.com').for(:email) }
    it { is_expected.not_to allow_value('user@gmail,com').for(:email).with_message('must be a valid email format') }
    it { is_expected.not_to allow_value('user@.com').for(:email).with_message('must be a valid email format') }
    it { is_expected.not_to allow_value('user name@gmail.com').for(:email).with_message('must be a valid email format') }
    it { is_expected.not_to allow_value('bob@bob').for(:email).with_message('must be a valid email format') }

    it { is_expected.to validate_presence_of(:password) }
    it { is_expected.to allow_value('!abc123').for(:password) }
    it { is_expected.not_to allow_value('abc').for(:password) }
    it { is_expected.not_to allow_value('abcdefg').for(:password) }

    it 'does not allow passwords with repeated characters more than twice' do
      user = build(:user,
                   password: '!aaabcd',
                   password_confirmation: '!aaabcd',
                   email: 'test@example.com',
                   user_name: 'username')
      expect(user).not_to be_valid
    end

    it { is_expected.to validate_presence_of(:user_name) }
    it { is_expected.to validate_uniqueness_of(:user_name) }
    it { is_expected.to validate_length_of(:user_name).is_at_most(15) }
    it { is_expected.to allow_value('valid_user123').for(:user_name) }
    it { is_expected.not_to allow_value('invalid.user!').for(:user_name).with_message('only allows letters, numbers, and underscores') }
    it { is_expected.not_to allow_value('user name').for(:user_name).with_message('only allows letters, numbers, and underscores') }

    it 'allows exactly 15 characters for user_name' do
      user = build(:user, user_name: 'a' * 15)
      expect(user).to be_valid
    end

    it 'does not allow more than 15 characters for user_name' do
      user = build(:user, user_name: 'a' * 16)
      expect(user).not_to be_valid
    end

    it 'does not allow duplicate emails' do
      create(:user, email: 'duplicate@example.com')
      duplicate_user = build(:user, email: 'duplicate@example.com')
      expect(duplicate_user).not_to be_valid
      expect(duplicate_user.errors[:email]).to include('has already been taken')
    end

    it 'does not allow duplicate user names' do
      create(:user, user_name: 'duplicate_user')
      duplicate_user = build(:user, user_name: 'duplicate_user')
      expect(duplicate_user).not_to be_valid
      expect(duplicate_user.errors[:user_name]).to include('has already been taken')
    end
  end

  context 'Confirmable' do
    let(:unconfirmed_user) { build(:user, confirmed_at: nil) }

    it 'is not confirmed by default' do
      expect(unconfirmed_user.confirmed?).to eq(false)
    end

    it 'becomes confirmed after confirmation' do
      unconfirmed_user.confirm
      expect(unconfirmed_user.confirmed?).to eq(true)
    end

    it 'does not allow sign-in before confirmation' do
      expect(unconfirmed_user.confirmed?).to eq(false)
      expect(unconfirmed_user.valid_password?('@password')).to eq(true)
      expect(unconfirmed_user.confirmed_at).to be_nil
    end

    it 'allows sign-in after confirmation' do
      user.confirm
      expect(user.confirmed?).to eq(true)
      expect(user.valid_password?('@password')).to eq(true)
    end
  end
end
