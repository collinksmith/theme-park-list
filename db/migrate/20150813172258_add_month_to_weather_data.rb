class AddMonthToWeatherData < ActiveRecord::Migration
  def change
    add_column :weather_data, :month, :string
  end
end
