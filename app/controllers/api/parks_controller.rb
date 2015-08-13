class Api::ParksController < ApplicationController
  def index
    @parks = Park.includes(:costs, city: :weather_data)
    # debugger
    # Default to getting weather data for the entire year.
    @season = params[:season] || "year"
  end

  def show
    @park = Park.find(params[:id])
    @season = params[:season] || "year"
  end
end
