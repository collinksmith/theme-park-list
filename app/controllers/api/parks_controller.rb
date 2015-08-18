class Api::ParksController < ApplicationController
  def index
    @page = params[:page].to_i
    season = params[:season]
    @parks = Park.with_weather_data_and_associations(season)

    @parks = apply_search(@parks, params[:query]) if params[:query]
    @parks = apply_filters(@parks, params[:filters]) if params[:filters]
    @parks = apply_sort(@parks, params[:sort], season) if params[:sort]

    @total_pages = (@parks.all.length.to_f / 25).ceil
    @total_items = (@parks.all.length)
    @parks = select_page(@parks, @page)
  end

  def show
    @park = Park.find(params[:id])
    @park_with_weather = Park.with_weather_data(params[:season]).
                         select { |park| park.id == params[:id].to_i }.first
  end

  private

  FILTERS = {
    "cool" => "high < 65",
    "warm" => "high >= 65 AND high < 85",
    "hot" => "high >= 85",
    "some roller coasters" => "roller_coasters > 2",
    "many roller coasters" => "roller_coasters > 5",
    "some water rides" => "water_rides > 2",
    "many water rides" => "water_rides > 5"
  }

  SORTS = {
    "weather Score" => "weather_score",
    "number of rides" => "rides",
    "number of roller coasters" => "roller_coasters",
    "number of water rides" => "water_rides"
  }

  def apply_filters(parks, filters)
    filters.each do |filter|
      parks = parks.where(FILTERS[filter.downcase])
    end
    parks
  end

  def apply_search(parks, query)
    parks.where("LOWER(parks.name) LIKE '%#{query.downcase}%'")
  end

  def apply_sort(parks, sort, season)
    # Convert parks to ActiveRecord relation if it was turned into an array
    # when filtering
    if parks.is_a?(Array)
      parks = Park.with_weather_data_and_associations(season).
              where(id: r.map(&:id))
    end

    sort = SORTS[sort.downcase]
    if sort == "weather_score"
      parks = parks.to_a.sort { |park| park.weather_score }
    else
      parks = parks.order("#{sort} DESC")
    end

    parks
  end

  def apply_weather_filters(filters)

  end

  def select_page(parks, page, per = 25)
    front = (page - 1) * per
    back = front + per
    parks.to_a[front...back]
  end
end
