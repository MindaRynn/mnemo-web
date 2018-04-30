class CreateTags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.text :tag

      t.timestamps
    end
  end
end
