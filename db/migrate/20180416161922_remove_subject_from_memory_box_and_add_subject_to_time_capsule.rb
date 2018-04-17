class RemoveSubjectFromMemoryBoxAndAddSubjectToTimeCapsule < ActiveRecord::Migration[5.1]
  def change
    add_column :time_capsules, :subject, :text
    remove_column :memory_boxes, :subject
  end
end
