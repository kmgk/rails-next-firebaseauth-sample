Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get '/hoge', to: 'firebase_auth#index'
    end
  end
end
