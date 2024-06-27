class ItemsController < ApplicationController
  before_action :authenticate_user!

  def index
    factories = current_user.factories.pluck(:id)
    @items = Item.where(factory_id: factories)
    render json: @items.map { |item| item.as_json.merge(image_url: item.image.attached? ? url_for(item.image) : nil) }
  end


  def show
    @item = Item.find(params[:id])
    render json: @item.as_json.merge(image_url: url_for(@item.image))
  end

  def create
    @item = Item.new(item_params)
    if @item.save
      attach_image if params[:item][:image].present?
      render json: @item, status: :created
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  def update
    @item = Item.find(params[:id])
    if @item.update(item_params)
      attach_image if params[:item][:image].present?
      render json: @item, status: :ok
    else
      render json: @item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy
    head :no_content
  end

  private

  def item_params
    params.require(:item).permit(:name, :width, :height, :image, :content, :content_type, :factory_id, tags: [])
  end

  def attach_image
    @item.image.attach(params[:item][:image])
  end
end
