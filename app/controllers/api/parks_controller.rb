class Api::ParksController < ApplicationController
  def index
    @page = params[:page] ? params[:page].to_i : 1
    @season = params[:season] ? params[:season].downcase.to_sym : :year
    sort = params[:sort] || "Trip Advisor Score"
    low_cost = params[:costs] ? params[:costs][0].to_i : 0
    high_cost = params[:costs] ? params[:costs][1].to_i : 250

    if params[:user_id]
      user = User.find(params[:user_id])
      @parks = user.parks.with_weather_data_and_associations(:year)
    else
      @parks = Park.with_weather_data_and_associations(@season)
    end

    @parks = apply_search(@parks, params[:query]) if params[:query]
    @parks = apply_filters(@parks, params[:filters]) if params[:filters]
    @parks = apply_sort(@parks, sort)

    # Apply cost filter if necessary
    if low_cost > 0 || high_cost < 250
      @parks = apply_cost_filter(@parks, low_cost, high_cost)
    end

    # Set total pages and total_items
    if @parks.is_a?(Array)
      @total_pages = (@parks.length.to_f / 25).ceil
      @total_items = (@parks.length)
    else
      @total_pages = (@parks.all.length.to_f / 25).ceil
      @total_items = (@parks.all.length)
    end

    # Set ord attribute of parks
    @parks.to_a.map.with_index { |park, i| park.ord = i + 1 }

    # Select the correct page
    @parks = select_page(@parks, @page) unless params[:page] == "all"
  end

  def show
    @park = Park.with_weather_data_and_associations(params[:season]).
                 includes(:favorites, :users, reviews: [:user]).
                 find(params[:id])
  end

  private

  FILTERS = {
    "some coasters" => "roller_coasters > 2",
    "many coasters" => "roller_coasters > 5",
    "some water rides" => "water_rides > 2",
    "many water rides" => "water_rides > 5"
  }

  WEATHER_FILTERS = {
    "cool" => Proc.new { |p| p.high < 65 },
    "warm" => Proc.new { |p| p.high >= 65 && p.high < 80 },
    "hot" => Proc.new { |p| p.high >= 80 },
  }

  SORTS = {
    "trip advisor score" => "tripadv_rating",
    "weather score" => "weather_score",
    "number of rides" => "rides",
    "number of roller coasters" => "roller_coasters",
    "number of water rides" => "water_rides"
  }

  def apply_filters(parks, filters)
    weather_filters = []
    filters.each do |filter|
      if WEATHER_FILTERS.keys.include?(filter.downcase)
        weather_filters << filter
        next
      end
      parks = parks.where(FILTERS[filter.downcase])
    end
    parks = apply_weather_filters(parks, weather_filters)

    # Convert parks to ActiveRecord relation if it was turned into an array
    parks = convert_to_relation(parks) if parks.is_a?(Array)

    parks
  end

  def apply_search(parks, query)
    parks.where("LOWER(parks.name) LIKE '%#{query.downcase}%'")
  end

  def apply_sort(parks, sort)
    sort = SORTS[sort.downcase]
    if sort == "weather_score"
      parks = parks.to_a.sort_by { |park| park.weather_score }.reverse!
    else
      parks = parks.order("#{sort} DESC")
    end

    parks
  end

  def apply_weather_filters(parks, filters)
    parks = parks.to_a
    filters.each do |filter|
      selector = WEATHER_FILTERS[filter.downcase]
      parks = parks.select(&selector)
    end

    parks
  end

  def apply_cost_filter(parks, low_cost, high_cost)
    parks.to_a.select { |park| park.ticket_price.to_f > low_cost &&
                          park.ticket_price.to_f < high_cost }
  end

  def select_page(parks, page, per = 25)
    front = (page - 1) * per
    back = front + per
    parks.to_a[front...back]
  end

  def convert_to_relation(parks)
    Park.with_weather_data_and_associations(@season).where(id: parks.map(&:id))
  end
end
