Rails.application.routes.draw do
  root to: "static_pages#index"

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:new, :create, :show]
    resource :session, only: [:new, :create, :destroy]
    resources :parks, only: [:index, :show]
    resources :costs, only: [:index, :show]
    resources :reviews, only: [:index, :show, :create, :update, :destroy]
    resources :favorites, only: [:create, :destroy]
  end
end
