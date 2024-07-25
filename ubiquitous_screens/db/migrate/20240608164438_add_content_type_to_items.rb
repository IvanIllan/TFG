class AddContentTypeToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :content_type, :string
  end
end
