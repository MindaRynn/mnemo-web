class AddMemoryBoxIdToMedium < ActiveRecord::Migration[5.1]
  def change
    add_reference :media, :memory_box, index: true
  end
end
