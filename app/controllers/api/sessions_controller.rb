class Api::SessionsController < ApplicationController
  def new
    @user = User.new
    render json: @user
  end

  def create
    @user = User.find_by_credentials(params[:user][:username],
                                     params[:user][:password])

    if @user
      login!(@user)
      redirect_to links_url
    else
      flash.now[:errors] = "Invalid credentials"
      @user = User.new
      render json: @user
    end
  end

  def destroy
    @user = current_user
    logout!
    render json: @user
  end
end
