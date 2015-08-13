class Api::ParksController < ApplicationController
  def index
    @parks = Park.all
    @season = params[:season] || "year"
  end

  def show
    @park = Park.find(params[:id])
    @season = params[:season] || "year"
  end
end
