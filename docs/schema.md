# Schema Information

## parks
column name          | data type | details
---------------------|-----------|-----------------------
id                   | integer   | not null, primary key
city_id              | integer   | not null, foreign key (references cities)
name                 | string    | not null
latitude             | float     | not null
longitude            | float     | not null
url                  | string    |
image_url            | string    |
tripadv_rating       | integer   |
rides                | integer   |
roller_coasters      | integer   |
water_rides          | integer   |

## cities
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
state       | string    |
country     | string    | not null

## weather data
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
city_id     | integer   | not null, foreign key (references cities)
month       | string    | not null
avg_high    | float     | 
avg_low     | float     | 
avg_precip  | float     | 

## costs
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
park_id     | integer   | not null, foreign key (references parks)
amount      | decimal   | not null
cost_type   | string    | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## reviews
column name         | data type | details
--------------------|-----------|-----------------------
id                  | integer   | not null, primary key
user_id             | integer   | not null, foreign key (references users)
park_id             | integer   | not null, foreign key (references parks)
title               | string    |
body                | text      |
overall             | integer   | not null
atmosphere          | integer   |
family_friendliness | integer   |
intesity            | integer   |
wait_times          | integer   |
cost                | integer   |

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
park_id     | integer   | not null, foreign key (references parks)
follower_id | integer   | not null, foreign key (references users)
