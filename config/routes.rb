Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tweets, only: [ :index, :create, :show, :update, :destroy ] do
        resources :comments, only: [ :index ]
      end
      resources :users, only: [ :index ]
      resources :likes, only: [ :index, :create, :destroy ]
      resources :comments, only: [ :create, :update, :destroy ]
    end
  end

  devise_for :users

  root "static#home"
  get "up" => "rails/health#show", as: :rails_health_check
  get "*path", to: "static#home", constraints: ->(req) { !req.xhr? && req.format.html? }
end
