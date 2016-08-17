class AddStepsToRecipes < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :content, :text
  end
end
