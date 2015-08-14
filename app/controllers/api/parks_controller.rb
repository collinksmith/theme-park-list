class Api::ParksController < ApplicationController
  def index
    @parks = Park.with_weather_data(params[:season])
  end

  def show
    @park = Park.find(params[:id])
    @season = params[:season] || "year"
  end
end
