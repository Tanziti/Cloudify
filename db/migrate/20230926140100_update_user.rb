class UpdateUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :queue, :text, default: '{}'
  end
end
