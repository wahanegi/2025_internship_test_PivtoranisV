require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  it 'is expected to have a valid factory' do
    expect(user.valid?).to eq true
  end

  context 'Validation' do
    it { should validate_presence_of(:email) }
    it { should validate_uniqueness_of(:email).case_insensitive }
    it { should validate_presence_of(:password) }
    it { should validate_presence_of(:user_name) }
    it { should validate_uniqueness_of(:user_name) }
    it { should validate_length_of(:user_name).is_at_most(15) }
    it { should allow_value('valid_user123').for(:user_name) }
    it { should_not allow_value('invalid.user!').for(:user_name).with_message('only allows letters, numbers, and underscores') }
    it { should allow_value('!abc123').for(:password) }
    it { should_not allow_value('abc').for(:password) }
    it { should_not allow_value('abcdefg').for(:password) }
    it 'does not allow passwords with repeated characters more than twice' do
      user = build(:user,
               password: '!aaabcd',
               password_confirmation: '!aaabcd',
               email: 'test@example.com',
               user_name: 'username')
      expect(user).not_to be_valid
    end
  end
end
