class CreateAdministrators < ActiveRecord::Migration[6.1]
  def change
    create_table :administrators do |t|
      t.string :email
      t.string :full_name

      t.timestamps
    end
  end
end
