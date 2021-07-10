class AddForeignKeyEstablishmentId < ActiveRecord::Migration[6.1]
  def change
    add_column("interfaces","establishment_id","string")
  end
end
