class Item < ApplicationRecord
  self.inheritance_column = :type
  belongs_to :factory

  validates :name, presence: true
  validates :width, :height, presence: true, numericality: { greater_than: 0 }
end