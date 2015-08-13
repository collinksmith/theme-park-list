# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150813172258) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cities", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "state"
    t.string   "country",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "costs", force: :cascade do |t|
    t.integer  "park_id",    null: false
    t.decimal  "amount",     null: false
    t.string   "cost_type",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "costs", ["park_id"], name: "index_costs_on_park_id", using: :btree

  create_table "parks", force: :cascade do |t|
    t.string   "name",            null: false
    t.float    "latitude",        null: false
    t.float    "longitude",       null: false
    t.string   "image_url"
    t.integer  "tripadv_rating"
    t.integer  "roller_coasters"
    t.integer  "water_rides"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.integer  "rides"
    t.string   "url"
    t.integer  "city_id"
  end

  add_index "parks", ["name"], name: "index_parks_on_name", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

  create_table "weather_data", force: :cascade do |t|
    t.integer  "city_id",    null: false
    t.float    "avg_high"
    t.float    "avg_low"
    t.float    "avg_precip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "month"
  end

  add_index "weather_data", ["city_id"], name: "index_weather_data_on_city_id", using: :btree

end
