Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tweets, only: [ :index, :create ]
    end
  end

  devise_for :users

  # Defines the root path route ("/")
  root "static#home"
  get "up" => "rails/health#show", as: :rails_health_check
end
