class Item < ApplicationRecord
  belongs_to :factory
  has_one_attached :image

  validates :name, presence: true
  validates :width, :height, presence: true, numericality: { greater_than: 0 }
  validate :validate_content_type

  def image_url
    Rails.application.routes.url_helpers.rails_blob_url(image, only_path: true) if image.attached?
  end

  private

  def validate_content_type
    if content_type == 'image' && image.blank?
      errors.add(:image, 'must be attached if content_type is image')
    elsif content_type == 'content' && content.blank?
      errors.add(:content, 'must be present if content_type is content')
    end
  end
end