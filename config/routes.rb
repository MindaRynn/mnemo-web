Rails.application.routes.draw do
  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  namespace :api do
    namespace :v1 do
      resources :friends, only: :index
      resources :rooms, only: [:index, :show, :create]
      resources :time_capsules, only: [:index, :create, :update, :destroy] do
        post '/open', to: 'time_capsules#opened'
      end
      resources :memory_boxes, only: [:index, :create]
      resources :medium, only: [:index, :create]
    end
  end

  resources :friend_requests
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks', registrations: 'registrations' }
  get '*path', to: 'home#index'

  post '/upload', to: 'upload#create'

  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
