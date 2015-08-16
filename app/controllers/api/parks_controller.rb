class Api::ParksController < ApplicationController
  def index
    @page = params[:page].to_i
    @parks = Park.includes(:costs, :city).page(params[:page].to_i)
    @parks_with_weather = Park.with_weather_data(params[:season], params[:page].to_i)
    @total_pages = @parks.total_pages
  end

  def show
    @park = Park.find(params[:id])
    @park_with_weather = Park.with_weather_data(params[:season]).
                         select { |park| park.id == params[:id].to_i }.first
  end
end
