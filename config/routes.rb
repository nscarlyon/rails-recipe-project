Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'welcome#home', as: 'home'
  devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }

  resources :users do
    resources :recipes, only: [:index]
  end


  resources :recipes do
    resources :comments, only: [:new, :create, :edit, :update, :destroy, :show, :index]
  end

  get 'users/most_recipes', to: 'users#show'
end
