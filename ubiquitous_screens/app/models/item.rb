class Item < ApplicationRecord
  belongs_to :factory

  validates :width, :high, presence: true
  validates :categorias, array: true, default: []
end
