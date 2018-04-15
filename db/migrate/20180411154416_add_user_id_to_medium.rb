class AddUserIdToMedium < ActiveRecord::Migration[5.1]
  def change
    add_reference :media, :user, index: true
  end
end
