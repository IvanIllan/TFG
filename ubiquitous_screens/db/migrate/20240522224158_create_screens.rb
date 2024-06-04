class CreateScreens < ActiveRecord::Migration[6.1]
  def change
    create_table :screens do |t|
      t.string :name
      t.integer :width
      t.integer :high
      t.string :mac
      t.jsonb :html_structure
      t.references :factory, null: false, foreign_key: true

      t.timestamps
    end
  end
end
