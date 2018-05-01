class CreateGiftRelationships < ActiveRecord::Migration[5.1]
  def change
    create_table :gift_relationships do |t|
      t.integer :time_capsule_id
      t.integer :user_id

      t.timestamps
    end
  end
end
