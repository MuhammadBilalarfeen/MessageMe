class SessionsController < ApplicationController
  before_action :logged_in_redirect, only: [:new, :create]
  
  def new
    # shows login form
  end

  def create
    user = User.find_by(username: params[:username])
    
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: "Logged in successfully"
    else
      flash.now[:error] = "Invalid username or password"
      render :new
    end
  end

  
def destroy
  log_out if logged_in?
  redirect_to login_path
end



private

def logged_in_redirect
  if logged_in?
    flash[:error] = "You are already logged in"
    redirect_to root_path
  end
 end
end