class AddRidesToParks < ActiveRecord::Migration
  def change
    add_column :parks, :rides, :integer
  end
end
