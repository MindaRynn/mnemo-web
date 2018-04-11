class AddUserIdToTimeMemoryBoxes < ActiveRecord::Migration[5.1]
  def change
    add_reference :memory_boxes, :user, index: true
  end
end
