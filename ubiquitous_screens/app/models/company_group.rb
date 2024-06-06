class CompanyGroup < ApplicationRecord
  has_many :users
  has_many :factories

  validates :brand, presence: true
end
