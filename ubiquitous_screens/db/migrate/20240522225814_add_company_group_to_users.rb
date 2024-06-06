class AddCompanyGroupToUsers < ActiveRecord::Migration[6.1]
  def change
    add_reference :users, :company_group, null: false, foreign_key: true, default: 1
  end
end
