class Api::ReviewsController < ApplicationController
  def index
  end

  def show
  end

  def create
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
