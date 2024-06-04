class Factory < ApplicationRecord
  belongs_to :company_group
  belongs_to :user

  has_many :screens
  has_many :items

  validates :address, presence: true
end
