json.(park, :id, :name, :latitude, :longitude, :city, :state, :country, 
            :image_url, :tripadv_rating, :roller_coasters, :water_rides)

json.weather
  json.score = park.weather_score(season)
  json.high = park.avg_high(season)
  json.low = park.avg_low(season)
  json.precip = park.avg_precip(season)
end