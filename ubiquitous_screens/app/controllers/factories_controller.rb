class FactoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    @factories = current_user.company_group.factories
    render json: @factories
  end
end