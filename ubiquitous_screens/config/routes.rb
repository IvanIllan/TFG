Rails.application.routes.draw do
  devise_for :users, skip: %i[registrations sessions passwords]
  devise_scope :user do
    post 'signup', to: 'registrations#create'
    post 'login', to: 'sessions#create'
    delete 'logout', to: 'sessions#destroy'
  end
  resources :items, only: [:index, :show, :create, :update, :destroy]
  resources :factories, only: [:index]
end
