class AddTagIdToTimeCapsule < ActiveRecord::Migration[5.1]
  def change
    add_reference :time_capsules, :tag, index: true
  end
end
