class AddDirectTypeToTimeCapsule < ActiveRecord::Migration[5.1]
  def change
    add_column :time_capsules, :direct_type, :integer, default: 0, null: false
  end
end
