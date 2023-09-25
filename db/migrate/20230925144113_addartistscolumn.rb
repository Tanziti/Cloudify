class Addartistscolumn < ActiveRecord::Migration[7.0]
  def change
    add_column :artists, :bio, :text, null: false
  end
end
