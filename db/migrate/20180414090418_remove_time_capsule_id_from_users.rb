class RemoveTimeCapsuleIdFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column(:users, :time_capsule_id)
  end
end
