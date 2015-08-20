class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :park_id, null: false
      t.integer :user_id, null: false
      t.string :title
      t.text :body
      t.integer :overall, null: false
      t.integer :atmosphere
      t.integer :family_friendliness
      t.integer :intensity
      t.integer :wait_times
      t.integer :cost

      t.timestamps null: false
    end

    add_index :reviews, :park_id
    add_index :reviews, :user_id
  end
end
