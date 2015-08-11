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
# operating_season: ,
# image_url: ,
# tripadv_rating: ,
# rides: ,
# roller_coasters: ,
# water_rides: }

PARKS = [{ name: "Six Flags Magic Mountain",
           latitude: 34.42,
           longitude: -118.59,
           city: "Los Angeles",
           state: "California",
           country: "United States",
           image_url: "magic_mountain.jpg",
           tripadv_rating: 86,
           rides: 44,
           roller_coasters: 19,
           water_rides: 3 },
         { name: "California's Great America",
           latitude: 37.23,
           longitude: 121.58,
           city: "Santa Clara",
           state: "California",
           country: "United States",
           image_url: "californias_great_america.jpg",
           tripadv_rating: 76,
           rides: 58,
           roller_coasters: 8,
           water_rides: 3 }] 

PARKS.each { |park| Park.create(park) }

USERS = [{ email: "joe@gmail.com",
           password: "joejoe" },
         { email: "bob@yahoo.com",
           password: "bobbob" }]

USERS.each { |user| User.create(user) }