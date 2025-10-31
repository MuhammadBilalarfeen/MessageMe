Rails.application.routes.draw do

  root "chatroom#index"

  # Session routes
  get    "/login",  to: "sessions#new"
  post   "/login",  to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'


  mount ActionCable.server, at: '/cable'


  # Resources
  resources :chatrooms, only: [:index, :show]
  resources :messages, only: [:create, :destroy ]
end
