Rails.application.routes.draw do
  root to: "static_pages#index"
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
end
