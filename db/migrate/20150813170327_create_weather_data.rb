class CreateWeatherData < ActiveRecord::Migration
  def change
    create_table :weather_data do |t|
      t.integer :city_id, null: false
      t.float :avg_high
      t.float :avg_low
      t.float :avg_precip

      t.timestamps null: false
    end

    add_index :weather_data, :city_id
  end
end
