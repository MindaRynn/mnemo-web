class CreateTimeCapsules < ActiveRecord::Migration[5.1]
  def change
    create_table :time_capsules do |t|

      t.timestamps
    end
  end
end
