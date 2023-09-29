class Addartistscolumn < ActiveRecord::Migration[7.0]
  def change
    remove_column :artists, :bio
    add_column :artists, :bio, :text, null: false
  end
end
