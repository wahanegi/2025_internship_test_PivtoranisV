Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :tweets, only: [ :index ]
    end
  end

  devise_for :users

  # Defines the root path route ("/")
  # root "posts#index"
  get "up" => "rails/health#show", as: :rails_health_check
end
