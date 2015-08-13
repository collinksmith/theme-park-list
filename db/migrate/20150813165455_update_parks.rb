class UpdateParks < ActiveRecord::Migration
  def change
    remove_column :parks, :city
    remove_column :parks, :state
    remove_column :parks, :country
    add_column :parks, :city_id, :integer
  end
end
