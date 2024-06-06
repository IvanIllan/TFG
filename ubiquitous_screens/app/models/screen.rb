class Screen < ApplicationRecord
  belongs_to :factory

  validates :name, :width, :high, :mac, :html_structure, presence: true

  validate :html_structure_is_json

  private

  def html_structure_is_json
    JSON.parse(html_structure)
  rescue JSON::ParserError
    errors.add(:estructura_html, 'must be a valid JSON')
  end
end