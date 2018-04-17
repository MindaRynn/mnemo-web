class CreateParticipations < ActiveRecord::Migration[5.1]
  def change
    create_table :participations do |t|
      t.integer :time_capsule_id
      t.integer :user_id

      t.timestamps
    end
  end
end
