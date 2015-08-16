json.parks do
  json.array! @parks_with_weather do |park_with_weather|
    park = @parks.select { |park2| park2.id == park_with_weather.id }.first
    json.partial! "park", park: park, park_with_weather: park_with_weather
  end
end

json.page(@page)
json.total_pages(@total_pages)