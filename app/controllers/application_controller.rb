class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  allow_browser versions: :modern
  protect_from_forgery with: :exception

  def authenticate_user!
    if user_signed_in?
      super
    else
      respond_to do |format|
        format.json { render json: { error: "You need to sign in or sign up before continuing." }, status: :unauthorized }
        format.html { super }
      end
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :user_name ])
  end
end
