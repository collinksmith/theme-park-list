class CreateCosts < ActiveRecord::Migration
  def change
    create_table :costs do |t|
      t.integer :park_id, null: false
      t.decimal :amount, null: false
      t.string :cost_type, null: false

      t.timestamps null: false
    end

    add_index :costs, :park_id
  end
end
