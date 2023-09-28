class ChangeQueueColumnToJsonObject < ActiveRecord::Migration[7.0]
  def change
    remove_column :users, :queue # Remove the existing column
    add_column :users, :queue, :jsonb, default: {}
  end
end
