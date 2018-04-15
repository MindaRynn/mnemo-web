class AddTimeCapsuleIdToMemoryBoxes < ActiveRecord::Migration[5.1]
  def change
    add_reference :memory_boxes, :time_capsule, index: true
  end
end
