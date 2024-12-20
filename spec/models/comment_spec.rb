require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:comment) { create(:comment) }

  it 'is expected to have a valid factory' do
    expect(comment.valid?).to eq true
  end

  context 'Associations' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:tweet) }
  end

  context 'Validation' do
    it { is_expected.to validate_presence_of(:body) }
    it { is_expected.to allow_value('You want to enjoy life, don"t you?!!').for(:body) }
    it { is_expected.to validate_length_of(:body).is_at_most(255) }

    it 'allows exactly 255 characters for the content' do
      comment = build(:comment, body: 'a' * 255)
      expect(comment).to be_valid
    end

    it 'does not allow more than 255 characters for the content' do
      comment = build(:comment, body: 'a' * 256)
      expect(comment).not_to be_valid
      expect(comment.errors[:body]).to include('is too long (maximum is 255 characters)')
    end

    it 'is invalid without body' do
      comment = build(:comment, body: nil)
      expect(comment).not_to be_valid
      expect(comment.errors[:body]).to include("can't be blank")
    end

    it 'is invalid without a user' do
      comment = build(:comment, user: nil)
      expect(comment).not_to be_valid
      expect(comment.errors[:user]).to include("must exist")
    end

    it 'is invalid with blank body' do
      comment = build(:comment, body: '   ')
      expect(comment).not_to be_valid
      expect(comment.errors[:body]).to include("can't be blank")
    end
  end

  context 'Comment order' do
    it 'orders comments from most recent to oldest' do
      older_comment = create(:comment, created_at: 1.day.ago)
      newer_comment = create(:comment, created_at: Time.now)
      expect(Comment.recent).to eq([ newer_comment, older_comment ])
    end
  end
end
