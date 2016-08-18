class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  devise :omniauthable, :omniauth_providers => [:facebook]

  has_many :recipes
  has_many :comments, through: :recipes

     def self.from_omniauth(auth)
       where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
         user.email = auth.info.email
         user.password = Devise.friendly_token[0,20]
       end
     end

     def self.most_recipes
       User.joins(:recipes).group(:user_id).order("count(user_id) DESC").first.email
     end

end
