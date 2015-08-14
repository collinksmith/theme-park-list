json.(park, :id, :name, :latitude, :longitude, :city_id, :image_url, :url,
            :tripadv_rating, :rides, :roller_coasters, :water_rides)

json.weather do
  park.set_weather
  json.score park.weather_score
  json.high park.avg_high
  json.low park.avg_low
  json.precip park.avg_precip
end

json.costs park.costs do |cost|
  json.(cost, :id, :cost_type, :amount)
end