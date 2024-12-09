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
  end
end
