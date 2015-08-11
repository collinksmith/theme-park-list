# Schema Information

## parks
column name          | data type | details
---------------------|-----------|-----------------------
id                   | integer   | not null, primary key
name                 | string    | not null, unique
city                 | string    |
state                | string    |
country              | string    |
lat                  | float     | not null
long                 | float     | not null
image_url            | string    |
tripadv_rating       | integer   |
roller_coasters      | integer   |
water_rides          | integer   |

## costs
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
park_id     | integer   | not null, foreign key (references parks)
amount      | integer   | not null
type        | integer   | not null

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

## park_ratings
column name         | data type | details
--------------------|-----------|--------------------------
id                  | integer   | not null, primary key
park_id             | integer   | not null, foreign key (references parks)
review_id           | integer   | not null, foreign key (references reviews)
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
