class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    byebug
    build_resource(user_params)
    resource.save
    render json: resource, status: :created
  end

  private

  def user_params
    params.permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :password_confirmation,
      :country_code,
      :timezone,
      :lang
    )
  end
end