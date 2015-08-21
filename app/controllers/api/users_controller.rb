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
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
