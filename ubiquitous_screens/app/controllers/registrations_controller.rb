class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def create
    build_resource(sign_up_params)

    resource.save
    if resource.persisted?
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        render json: resource, status: :created
      else
        expire_data_after_sign_in!
        render json: { message: "signed_up_but_#{resource.inactive_message}" }, status: :ok
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      puts "#{format_errors(resource.errors)}"
      render json: { errors: format_errors(resource.errors) }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def format_errors(errors)
    formatted_errors = {}
    errors.messages.each do |attribute, messages|
      formatted_errors[attribute] = messages
    end
    formatted_errors
  end
end