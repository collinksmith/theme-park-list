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
city        | string    | not null
state       | string    |
country     | string    | not null

## costs
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
park_id     | integer   | not null, foreign key (references parks)
amount      | integer   | not null
type        | integer   | not null

## weather data
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
city_id     | integer   | not null, foreign key (references cities)
avg_high    | integer   | 
avg_low     | integer   | 
avg_precip  | integer   | 

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
author_id           | integer   | not null, foreign key (references users)
park_id             | integer   | not null, foreign key (references parks)
title               | string    |
body                | text      |
overall             | integer   | not null
atmosphere          | integer   |
family_friendliness | integer   |
intesity            | integer   |
wait_times          | integer   |

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
park_id     | integer   | not null, foreign key (references parks)
follower_id | integer   | not null, foreign key (references users)
