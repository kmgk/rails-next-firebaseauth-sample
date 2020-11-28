Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/users/new', to: 'users#create'
      patch '/users/update', to: 'users#update'
    end
  end
end
