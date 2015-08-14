json.(park, :id, :name, :latitude, :longitude, :city_id, :image_url, :url,
            :tripadv_rating, :rides, :roller_coasters, :water_rides)

json.weather do
  json.score park.weather_score
  json.high park.high
  json.low park.low
  json.precip park.precip
end