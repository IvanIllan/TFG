class RenameAddressToNameInFactories < ActiveRecord::Migration[6.1]
  def change
    rename_column :factories, :address, :name
  end
end
