Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  devise_for :users, skip: %i[registrations sessions passwords]
  devise_scope :user do
    post 'signup', to: 'registrations#create'
    post 'login', to: 'sessions#create'
    delete 'logout', to: 'sessions#destroy'
  end
  resources :items, only: [:index, :show, :create, :update, :destroy]
  resources :factories, only: [:index]
  resources :screens, only: [:index, :show, :create, :update, :destroy]
end
