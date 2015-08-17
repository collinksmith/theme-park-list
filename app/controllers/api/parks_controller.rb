class Api::ParksController < ApplicationController
  SEASONS = {
    winter: "('dec', 'jan', 'feb')",
    spring: "('mar', 'apr', 'may')",
    summer: "('jun', 'jul', 'aug')",
    fall: "('sep', 'oct', 'nov')",
    year: "('jan', 'feb', 'mar', 'apr', 'may', 'jun',
            'jul', 'aug', 'sep', 'oct', 'nov', 'dec')"
  }

  def index
    params[:season] ||= :year
    months = SEASONS[params[:season]]
    @page = params[:page].to_i

    @parks = Park.
      select("parks.*, 
              AVG(avg_high) AS high, 
              AVG(avg_low) AS low, 
              AVG(avg_precip) AS precip").
      joins("INNER JOIN cities ON parks.city_id = cities.id").
      joins("LEFT JOIN weather_data ON weather_data.city_id = cities.id").
      where("weather_data.city_id IS NULL OR 
             weather_data.month IN #{months}").
      group("id").
      includes(:costs, :city)



    @parks = select_page(@parks, @page)
    @total_pages = (Park.all.length.to_f / 25).ceil
  end

  def show
    @park = Park.find(params[:id])
    @park_with_weather = Park.with_weather_data(params[:season]).
                         select { |park| park.id == params[:id].to_i }.first
  end

  private

  FILTERS = {
    "cool" => "high < 65"
  }

  def apply_filters(parks, filters)
    filters.each do |filter|
      parks = parks.where("")
    end
  end

  def apply_weather_filters(filters)

  end

  def select_page(parks, page, per = 25)
    front = (page - 1) * per
    back = front + per
    parks.to_a.sort[front...back]
  end
end
