class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :confirmable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 6 }

  belongs_to :company_group
  has_many :factories

  before_validation :set_default_company_group

  private

  def set_default_company_group
    self.company_group_id ||= 1
  end
end