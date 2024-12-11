class ChangeContentColumnTypeInTweets < ActiveRecord::Migration[8.0]
  def up
    change_column :tweets, :content, :string, limit: 255
  end

  def down
    change_column :tweets, :content, :text
  end
end
