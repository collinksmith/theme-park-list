json.(park, :id, :name, :latitude, :longitude, :city_id, :image_url, :url,
            :tripadv_rating, :rides, :roller_coasters, :water_rides)

json.city park.city.name
json.state park.city.state
json.country park.city.country

json.costs park.costs do |cost|
  json.(cost, :id, :park_id, :cost_type, :amount)
end

json.weather do
  json.score park_with_weather.weather_score
  json.high park_with_weather.high
  json.low park_with_weather.low
  json.precip park_with_weather.precip
end