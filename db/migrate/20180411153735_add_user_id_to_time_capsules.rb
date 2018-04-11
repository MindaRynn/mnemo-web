class AddUserIdToTimeCapsules < ActiveRecord::Migration[5.1]
  def change
    add_reference :time_capsules, :user, index: true
  end
end
