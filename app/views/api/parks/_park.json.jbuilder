json.(park, :id, :name, :latitude, :longitude, :city_id, :image_url, :url,
            :tripadv_rating, :rides, :roller_coasters, :water_rides,
            :num_tripadv_ratings, :ord)

json.city park.city.name
json.state park.city.state
json.country park.city.country

json.costs park.costs do |cost|
  json.(cost, :id, :park_id, :cost_type, :amount)
end

json.weather do
  json.score park.weather_score
  json.high park.high
  json.low park.low
  json.precip park.precip
end