Rails.application.routes.draw do
 
  namespace :api, defaults: { format: :json } do
    get "songs/search", to: "songs#search"
    resources :users, only: :create
    resource :session, only: [:show, :create, :destroy]
    resources :artists, only: [:index, :show]
    resources :songs, only: [:index, :show]
    resources :albums, only: [:index, :show]
    resources :playlists, only: [:create, :index, :show, :update, :destroy]
    resources :playlist_songs, only: [:create, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"

end
