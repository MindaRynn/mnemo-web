class AddNotificationKeyToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :notification_key, :text
  end
end
