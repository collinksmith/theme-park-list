class Api::ParksController < ApplicationController
  def index
    @parks = Park.includes(:costs, :city).page(params[:page].to_i)
    @parks_with_weather = Park.with_weather_data(params[:season], params[:page].to_i)
  end

  def show
    @park = Park.find(params[:id])
    @park_with_weather = Park.with_weather_data(params[:season]).
                         select { |park| park.id == params[:id].to_i }.first
  end
end
