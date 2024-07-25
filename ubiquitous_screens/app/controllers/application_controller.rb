class ApplicationController < ActionController::API
  before_action :authenticate_user!

  def authenticate_user!
    puts "Token recibido: #{request.headers['Authorization']}"
    super
    puts "Usuario autenticado: #{current_user.inspect}" if user_signed_in?
  end
end
