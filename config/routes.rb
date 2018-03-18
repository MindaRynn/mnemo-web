Rails.application.routes.draw do
  resources :friend_requests, :rooms
  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  root 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  mount Api::Engine => "/api"

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
end
