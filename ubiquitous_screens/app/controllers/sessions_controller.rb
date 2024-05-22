class SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { message: 'Logged in successfully.', user: current_user }, status: :ok
    else
      render json: { error: 'Invalid Email or Password' }, status: :unauthorized
    end
  end

  def respond_to_on_destroy
    head :no_content
  end

  def log_in_params
    params.require(:user).permit(:email, :password)
  end

  # Método para manejar la autenticación fallida
  def invalid_login_attempt
    render json: { error: 'Invalid Email or Password' }, status: :unauthorized
  end
end