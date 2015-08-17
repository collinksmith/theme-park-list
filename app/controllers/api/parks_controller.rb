class Api::ParksController < ApplicationController
  def index
    @page = params[:page].to_i

    weather_data = Park.select("parks.* AS id, AVG(avg_high) AS high, AVG(avg_low) AS low, AVG(avg_precip) AS precip").joins("INNER JOIN cities ON parks.city_id = cities.id").joins("LEFT JOIN weather_data ON weather_data.city_id = cities.id").where("weather_data.city_id IS NULL OR weather_data.month IN ('jun', 'jul', 'aug')").references("weather_data").references("parks").group("id")
    @parks = weather_data.includes(:costs, :city)
    
    # @parks = Park.
    #   select("p.*, c.high, c.low. c.precip").
    #   from("parks p").
    #   joins("{c} c ON p.city_id = c.id")

    # @parks_with_weather = Park.
    #   select("p.*, w.high, w.low, w.precip").
    #   from('parks p').
    #   joins(City.select("cities.id AS id, AVG(avg_high) AS high, AVG(avg_low) AS low, AVG(avg_precip) AS precip").joins("cities").joins("LEFT JOIN weather_data ON weather_data.city_id = cities.id").where("weather_data.city_id IS NULL OR weather_data.month IN ('jun', 'jul', 'aug')").references("weather_data").references("parks").group("cities.id") w ON w.id = p.id)

    # @parks = Park.includes(:costs, :city).page(params[:page].to_i)
    # @parks_with_weather = Park.with_weather_data(params[:season], params[:page].to_i)
    @total_pages = @parks.total_pages

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
