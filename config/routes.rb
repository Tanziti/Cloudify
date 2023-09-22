Rails.application.routes.draw do
 
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]

    resources :artists, only: [:index, :show]
    resources :songs, only: [:index, :show]
    resources :albums, only: [:index, :show]
  end

  get '*path', to: "static_pages#frontend_index"

end
