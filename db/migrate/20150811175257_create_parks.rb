class CreateParks < ActiveRecord::Migration
  def change
    create_table :parks do |t|
      t.string :name, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :city, null: false
      t.string :state
      t.string :country
      t.string :image_url
      t.integer :tripadv_rating
      t.integer :roller_coasters
      t.integer :water_rides

      t.timestamps null: false
    end

    add_index :parks, :name
  end
end
