class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  after_filter :set_csrf_cookie

  def set_csrf_cookie
    cookies['XSRF-TOKEN'] = form_authenticity_token
    if protect_against_forgery?
    end
  end


  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end
end
