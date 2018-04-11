class CreateMedia < ActiveRecord::Migration[5.1]
  def change
    create_table :media do |t|
      t.integer :media_type
      t.text :media_url

      t.timestamps
    end
  end
end
