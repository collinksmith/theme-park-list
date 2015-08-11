Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:new, :create, :show]
    resource :session, only: [:new, :create, :destroy]
    resources :parks, only: [:index, :show]
  end
end
