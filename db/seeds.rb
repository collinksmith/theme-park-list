# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# { name: ,
# latitude: ,
# longitude: ,
# city: ,
# state: ,
# country: ,
# opening_date: ,
# closing_date: ,
# image_url: ,
# tripadv_rating: ,
# rides: ,
# roller_coasters: ,
# water_rides: }

PARKS = [{ name: "Six Flags Magic Mountain",
           latitude: 34.42,
           longitude: -118.59,
           city_id: 1,
           image_url: "magic_mountain.jpg",
           tripadv_rating: 86,
           rides: 44,
           roller_coasters: 19,
           water_rides: 3 },
         { name: "California's Great America",
           latitude: 37.23,
           longitude: 121.58,
           city_id: 2,
           image_url: "californias_great_america.jpg",
           tripadv_rating: 76,
           rides: 58,
           roller_coasters: 8,
           water_rides: 3 },
         { name: "Waterville USA",
            url: "http://watervilleusa.com/",
            latitude: 30.15,
            longitude: 87.41,
            city_id: 3,
            image_url: "waterville_usa.jpg",
            rides: 19,
            roller_coasters: 1,
            water_rides: 12 },
          { name: "Magic Springs and Crystal Falls",
            url: "http://www.magicsprings.com",
            latitude: 34.31,
            longitude: 93.0,
            city_id: 4,
            image_url: "magic_springs.jpg",
            rides: 20,
            roller_coasters: 5,
            water_rides: 2 },
          { name: "Santa Cruz Beach Boardwalk",
            url: "http://www.beachboardwalk.com",
            latitude: 36.57,
            longitude: 122.01,
            city_id: 5,
            image_url: "beach_boardwalk.jpg",
            rides: 35,
            roller_coasters: 3,
            water_rides: 1 },
          { name: "Pacific Park",
            url: "http://www.pacpark.com/",
            latitude: 34.0,
            longitude: 118.29,
            city_id: 6,
            image_url: "pacific_park.jpg",
            rides: 12,
            roller_coasters: 1,
            water_rides: "null"},] 

PARKS.each { |park| Park.create(park) }

USERS = [{ email: "joe@gmail.com",
           password: "joejoe" },
         { email: "bob@yahoo.com",
           password: "bobbob" }]

USERS.each { |user| User.create(user) }

CITIES = [
  { name: "Los Angeles",
    state: "California",
    country: "United States" },
  { name: "Santa Clara",
    state: "California",
    country: "United States" },
  { name: "Gulf Shores",
    state: "Alabama",
    country: "United States" },
  { name: "Hot Springs",
    state: "Arkansas",
    country: "United States" },
  { name: "Santa Cruz",
    state: "California",
    country: "United States" },
  { name: "Santa Monica",
    state: "California",
    country: "United States" },
]

CITIES.each { |city| City.create(city) }

WEATHER_DATA = [
  { city_id: 1,
    month: "jan",
    avg_high: 64,
    avg_low: 50,
    avg_precip: 3.07 },
  { city_id: 1,
    month: "feb",
    avg_high: 63,
    avg_low: 51,
    avg_precip: 2.56},
  { city_id: 1,
    month: "mar",
    avg_high: 62,
    avg_low: 52,
    avg_precip: 3.31},
  { city_id: 1,
    month: "apr",
    avg_high: 63,
    avg_low: 54,
    avg_precip: 0.51},
  { city_id: 1,
    month: "may",
    avg_high: 64,
    avg_low: 56,
    avg_precip: 0.24},
  { city_id: 1,
    month: "jun",
    avg_high: 66,
    avg_low: 59,
    avg_precip: 0.04},
  { city_id: 1,
    month: "jul",
    avg_high: 69,
    avg_low: 62,
    avg_precip: 0},
  { city_id: 1,
    month: "aug",
    avg_high: 70,
    avg_low: 63,
    avg_precip: 0.12},
  { city_id: 1,
    month: "sep",
    avg_high: 71,
    avg_low: 63,
    avg_precip: 0.16},
  { city_id: 1,
    month: "oct",
    avg_high: 70,
    avg_low: 59,
    avg_precip: 0.35},
  { city_id: 1,
    month: "nov",
    avg_high: 67,
    avg_low: 54,
    avg_precip: 1.02 },
  { city_id: 1,
    month: "dec",
    avg_high: 65,
    avg_low: 51,
    avg_precip: 1.85}
]

WEATHER_DATA.each { |weather_data| WeatherDatum.create(weather_data) }

COSTS = [
  { park_id: 1,
    amount: 72.99,
    cost_type: "adult_ticket"},
  { park_id: 1,
    amount: 47.99,
    cost_type: "child_ticket"},
  { park_id: 1,
    amount: 82.99,
    cost_type: "season_pass"}
]

COSTS.each { |cost| Cost.create(cost) }