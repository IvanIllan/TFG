class CreateForeignKeyInUser < ActiveRecord::Migration[6.1]
  def change
    add_column("users","establishment_id","string")
  end
end  