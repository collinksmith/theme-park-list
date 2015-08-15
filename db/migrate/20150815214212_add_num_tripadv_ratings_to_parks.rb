class AddNumTripadvRatingsToParks < ActiveRecord::Migration
  def change
    add_column :parks, :num_tripadv_ratings, :integer
  end
end
