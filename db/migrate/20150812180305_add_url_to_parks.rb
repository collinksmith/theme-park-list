class AddUrlToParks < ActiveRecord::Migration
  def change
    add_column :parks, :url, :string
  end
end
