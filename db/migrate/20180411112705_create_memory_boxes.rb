class CreateMemoryBoxes < ActiveRecord::Migration[5.1]
  def change
    create_table :memory_boxes do |t|

      t.timestamps
    end
  end
end
