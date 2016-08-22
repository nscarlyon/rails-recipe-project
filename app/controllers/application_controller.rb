class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def set_access_control_headers
    headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  end

  def after_sign_in_path_for(resource)
    request.env['omniauth.origin'] || home_path
  end

end
