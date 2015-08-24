class Api::UsersController < ApplicationController
  def new
    @user = User.new
    render :show
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find(params[:id])
    @reviews = @user.reviews.includes(:park)
    @parks = @user.parks.with_weather_data_and_associations(:year)
    render :show
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
