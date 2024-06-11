class Screen < ApplicationRecord
  belongs_to :factory

  validates :name, :width, :height, :mac, :html_structure, presence: true

  validate :html_structure_is_json

  private

  def html_structure_is_json
    JSON.parse(html_structure.to_json)
  rescue JSON::ParserError
    errors.add(:html_structure, 'must be a valid JSON')
  end
end
