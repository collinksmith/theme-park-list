class Api::ParksController < ApplicationController
  def index
    @parks = Park.includes(:costs, :city).page(1)
    ids = []
    @parks.each { |p| ids << p.id }
    @parks_with_weather = Park.page(1).with_weather_data(params[:season]).
      select { |park| ids.include?(park.id) }
  end

  def show
    @park = Park.find(params[:id])
    @park_with_weather = Park.with_weather_data(params[:season]).
                         select { |park| park.id == params[:id].to_i }.first
  end
end
