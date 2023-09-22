class Changesongs < ActiveRecord::Migration[7.0]
  def change
    remove_column :songs, :name, :string
    add_column :songs, :year, :integer, null: false
  end
end
