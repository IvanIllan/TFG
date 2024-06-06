class RenameHighToHeightInScreens < ActiveRecord::Migration[6.1]
  def change
    rename_column :screens, :high, :height
  end
end