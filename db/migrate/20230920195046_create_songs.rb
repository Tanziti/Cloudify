class CreateSongs < ActiveRecord::Migration[7.0]
  def change
    create_table :songs do |t|
      t.string :name, null: false, index: true
      t.string :title, null: false
      t.references :album
      t.references :artist, null: false
      t.timestamps
    end
  end
end
