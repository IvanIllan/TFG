class UpdateItemsAddNameAndContentAndChangeCategories < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :name, :string, null: false
    add_column :items, :content, :text
    add_column :items, :type, :string, null: false
    rename_column :items, :categories, :tags
    rename_column :items, :high, :height
  end
end
