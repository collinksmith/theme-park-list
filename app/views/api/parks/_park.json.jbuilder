json.(park, :id, :name, :latitude, :longitude, :city, :state, :country, 
            :image_url, :tripadv_rating, :roller_coasters, :water_rides)

json.weather
  park.set_weather(season)
  json.score = park.weather_score
  json.high = park.avg_high
  json.low = park.avg_low
  json.precip = park.avg_precip
end