class Api::CostsController < ApplicationController
  def show
    @cost = Cost.find(params[:id])
    render json: @cost
  end

  def index
    @costs = Cost.all
    render json: @costs
  end

  def create
    @cost = Cost.create(cost_params)
    render json: @cost
  end

  private

  def cost_params
    params.require(:cost).permit(:id, :amount, :cost_type, :park_id)
  end
end
