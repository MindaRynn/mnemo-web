class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :initialize_firebase

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) do |u|
      u.permit(:name, :email, :password, :password_confirmation, :notification_key)
    end

    devise_parameter_sanitizer.permit(:account_update) do |u|
      u.permit(:name, :image, :email, :bio, :password, :password_confirmation)
    end
    
  end

  def initialize_firebase
    firebase_url    = 'https://mnemo-194409.firebaseio.com/'
    firebase_secret = 'WT9D9VscWz2Y7kXEei78SwlZ6YSAiW5fmNX5zU2R'
    @firebase = Firebase::Client.new(firebase_url, firebase_secret)
  end
end
