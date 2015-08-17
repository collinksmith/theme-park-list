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

    parks_with_weather_data = Park.
      select("parks.*, 
              AVG(avg_high) AS high, 
              AVG(avg_low) AS low, 
              AVG(avg_precip) AS precip").
      joins("INNER JOIN cities ON parks.city_id = cities.id").
      joins("LEFT JOIN weather_data ON weather_data.city_id = cities.id").
      where("weather_data.city_id IS NULL OR 
             weather_data.month IN #{months}").
      group("id")

    @page = params[:page].to_i
    @parks = parks_with_weather_data.includes(:costs, :city).page(@page)

    @total_pages = (Park.all.length.to_f / 25).ceil
  end

  def show
    @park = Park.find(params[:id])
    @park_with_weather = Park.with_weather_data(params[:season]).
                         select { |park| park.id == params[:id].to_i }.first
  end

  private

  # def get_where_clauses(filters)
  #   filters = {
  #     "Cool" => ,
  #     "Warm" => ,
  #     "Hot" => ,

  #   }
  # end
end
