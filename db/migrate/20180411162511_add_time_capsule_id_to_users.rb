class AddTimeCapsuleIdToUsers < ActiveRecord::Migration[5.1]
  def change
    add_reference :users, :time_capsule, index: true
  end
end
