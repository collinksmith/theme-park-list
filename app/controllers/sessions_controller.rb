class SessionsController < ApplicationController
  def new
    @user = User.new
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
      render :new
    end
  end

  def destroy
    @user = current_user
    logout!
    redirect_to new_session_url
  end
end
