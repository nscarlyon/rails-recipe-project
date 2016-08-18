class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.text :content
      t.integer :user_id
      t.integer :recipe_id
    end
  end
end
