class SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: { message: 'Logged in successfully.', user: current_user }, status: :ok
  end

  def respond_to_on_destroy
    head :no_content
  end

  def log_in_params
    params.require(:user).permit(:email, :password)
  end
end