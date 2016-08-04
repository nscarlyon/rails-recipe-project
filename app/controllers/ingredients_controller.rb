class IngredientsController < ApplicationController
  def new
    @recipe = Recipe.find(params[:recipe_id])
    @ingredient = Ingredient.new
    Item.new 
  end

  def create
  end

end
