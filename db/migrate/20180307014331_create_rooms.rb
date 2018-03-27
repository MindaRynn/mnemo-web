class CreateRooms < ActiveRecord::Migration[5.1]
  def change
    create_table :rooms do |t|
      t.text :name
      t.string :room_key

      t.timestamps
    end
  end
end
