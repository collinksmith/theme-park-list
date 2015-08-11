class Api::SessionsController < ApplicationController
  def new
    @user = User.new
    render json: @user
  end

  def create
    @user = User.find_by_credentials(params[:user][:email],
                                     params[:user][:password])

    if @user
      login!(@user)
      render json: @user
    else
      # flash.now[:errors] = "Invalid credentials"
      @user = User.new
      render json: "Invalid credentials"
    end
  end

  def destroy
    @user = current_user
    logout!
    redirect_to root_url
  end
end
