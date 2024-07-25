class ScreensController < ApplicationController
  before_action :authenticate_user!
  before_action :set_screen, only: %i[show update destroy]

  def index
    screens = Screen.joins(:factory).where(factories: { id: current_user.factories.pluck(:id) })

    if params[:id].present?
      screens = screens.where(id: params[:id])
    end

    if params[:name].present?
      screens = screens.where('screens.name ILIKE ?', "%#{params[:name]}%")
    end

    if params[:factory].present?
      screens = screens.where('factories.name ILIKE ?', "%#{params[:factory]}%")
    end

    if params[:width].present?
      screens = screens.where(width: params[:width])
    end

    if params[:height].present?
      screens = screens.where(height: params[:height])
    end

    render json: screens.select('screens.*, factories.name as factory_name')
  end

  def show
    screen_data = @screen.as_json(include: { factory: { only: :name } })
    screen_data['items'] = @screen.html_structure
    render json: screen_data
  end

  def create
    @screen = Screen.new(screen_params)
    if @screen.save
      render json: @screen, status: :created
    else
      render json: @screen.errors, status: :unprocessable_entity
    end
  end

  def update
    if @screen.update(screen_params)
      render json: @screen, status: :ok
    else
      render json: @screen.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @screen.destroy
    head :no_content
  end

  private

  def set_screen
    @screen = Screen.find(params[:id])
  end

  def screen_params
    params.require(:screen).permit(:name, :width, :height, :mac, :factory_id, html_structure: [:id, :left, :top])
  end
end
