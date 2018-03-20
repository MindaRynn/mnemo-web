Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :friends, only: :index
    end
  end

  resources :friend_requests
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  get '*path', to: 'home#index'

  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
