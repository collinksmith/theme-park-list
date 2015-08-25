# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require_relative "seed_data/parks"
require_relative "seed_data/cities"
require_relative "seed_data/weather_data"
require_relative "seed_data/costs"
require_relative "seed_data/users"
require_relative "seed_data/reviews"

PARKS.each { |park| Park.create(park) }
CITIES.each { |city| City.create(city) }
WEATHER_DATA.each { |weather_data| WeatherDatum.create(weather_data) }
COSTS.each { |cost| Cost.create(cost) }
USERS.each { |user| User.create(user) }
REVIEWS.each { |review| Review.create(review) }