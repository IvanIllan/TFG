class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.integer :width, null: false
      t.integer :high, null: false
      t.string :categories, array: true, default: []
      t.references :factory, null: false, foreign_key: true

      t.timestamps
    end
  end
end
