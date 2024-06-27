class Screen < ApplicationRecord
  belongs_to :factory

  validates :name, :width, :height, :mac, :html_structure, presence: true

  validate :html_structure_is_json

  BASE_URL = 'http://localhost:3001/'

  def full_html_structure
    html_structure_array = html_structure
    html_structure_array.map do |element|
      item = Item.find_by(id: element['id'])
      next unless item

      {
        id: item.id,
        top: element['top'],
        left: element['left'],
        width: item.width,
        height: item.height,
        content_type: item.content_type,
        content: item.content,
        image_url: item.content_type == 'image' ? "#{BASE_URL}#{item.image_url}" : nil
      }
    end.compact
  end


  private

  def html_structure_is_json
    JSON.parse(html_structure.to_json)
  rescue JSON::ParserError
    errors.add(:html_structure, 'must be a valid JSON')
  end
end
