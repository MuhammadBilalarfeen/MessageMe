class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def logged_in?
    current_user.present?
  end

  def log_out
  session.delete(:user_id)
  @current_user = nil
end

  def require_login
    unless logged_in?
      redirect_to login_path, alert: "You must log in to access this page"
    end
  end
end
