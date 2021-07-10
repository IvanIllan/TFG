class CreateInterfaces < ActiveRecord::Migration[6.1]
  def change
    create_table :interfaces do |t|
      t.string :name, null: false
      t.string :structure, null: false
      t.boolean :current, null: false, default: false

      t.timestamps
    end
  end
end
