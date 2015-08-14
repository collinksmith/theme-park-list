class Api::ParksController < ApplicationController
  def index
    # cities = City.includes(:weather_data).where(weather_data: {month: %w{jun jul aug}})
    # debugger

    @parks = Park.includes(:costs, :city, :weather_data).where(weather_data: {month: %w{jun jul aug}})

    # debugger
    # Default to getting weather data for the entire year.
    @season = params[:season] || "year"
  end

  def show
    @park = Park.find(params[:id])
    @season = params[:season] || "year"
  end
end
