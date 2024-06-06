class CreateCompanyGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :company_groups do |t|
      t.string :brand

      t.timestamps
    end
  end
end
