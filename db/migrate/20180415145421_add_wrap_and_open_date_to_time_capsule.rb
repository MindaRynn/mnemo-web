class AddWrapAndOpenDateToTimeCapsule < ActiveRecord::Migration[5.1]
  def change
    add_column :time_capsules, :wrap_date, :text
    add_column :time_capsules, :open_date, :text
  end
end
