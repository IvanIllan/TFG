class Factory < ApplicationRecord
  belongs_to :company_group
  belongs_to :user

  validates :name, presence: true
  validates :company_group_id, presence: true
  validates :user_id, presence: true
end