class Api::ReviewsController < ApplicationController
  before_action :require_login, only: [:create, :update, :destroy]

  def index
    @reviews= Review.all.includes(:user)
    render :index
  end

  def show
    @review = Review.find(params[:id])
    render :show
  end

  def create
    @review = Review.new(review_params)

    if @review.save
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def update
    @review = Review.find(params[:id])

    if @review.update(review_params)
      render :show
    else
      render json: @review.errors.full_messages, status: 422
    end
  end

  def destroy
    @review = Review.find(params[:id])
    @review.destroy!
    render :show
  end

  private

  def review_params
    params.require(:review).permit(:title, :body, :user_id, :park_id, :overall,
                                   :atmosphere, :family_friendliness, :intensity,
                                   :wait_times, :cost)
  end
end
