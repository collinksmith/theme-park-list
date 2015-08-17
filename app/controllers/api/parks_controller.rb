class Api::ParksController < ApplicationController
  def index
    @page = params[:page].to_i
    @parks = Park.with_weather_data_and_associations(params[:season])

    @parks = apply_filters(@parks, params[:filters]) if params[:filters]
    @total_pages = (@parks.all.length.to_f / 25).ceil
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

  def apply_filters(parks, filters)
    filters.each do |filter|
      parks = parks.where(FILTERS[filter.downcase])
    end
    parks
  end

  def apply_weather_filters(filters)

  end

  def select_page(parks, page, per = 25)
    front = (page - 1) * per
    back = front + per
    parks.to_a.sort[front...back]
  end
end
