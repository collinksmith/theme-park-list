class Api::ParksController < ApplicationController
  def index
    @parks = Park.includes(:costs, :city).page(5)
    @parks_with_weather = Park.with_weather_data(params[:season], 5)
  end

  def show
    @park = Park.find(params[:id])
    @park_with_weather = Park.with_weather_data(params[:season]).
                         select { |park| park.id == params[:id].to_i }.first
  end
end
