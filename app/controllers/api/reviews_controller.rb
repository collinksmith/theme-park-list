class Api::ReviewsController < ApplicationController
  def index
  end

  def show
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
  end

  def destroy
  end

  private

  def review_params
    params.require(:review).permit(:title, :body, :user_id, :park_id, :overall,
                                   :atmosphere, :family_friendliness, :intensity,
                                   :wait_times, :cost)
  end
end
