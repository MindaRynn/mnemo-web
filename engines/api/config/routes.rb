Api::Engine.routes.draw do

  namespace :v1 do
    resources :friends, only: :index
  end
end
