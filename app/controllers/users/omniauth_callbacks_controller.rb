class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def facebook
    @user = User.from_omniauth(request.env["omniauth.auth"])
    if @user.persisted?
      sign_in_and_redirect @user
      flash[:notice] = "Logged in as #{@user.email}"
    end
  end



#  def facebook
#    @user = User.from_omniauth(request.env["omniauth.auth"])
#    sign_in_and_redirect @user
#  end
end
