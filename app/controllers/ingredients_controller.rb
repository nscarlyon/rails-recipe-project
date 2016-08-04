class IngredientsController < ApplicationController
  def new
    @recipe = Recipe.find(params[:recipe_id])
  end

  def create
    @recipe = Recipe.find(params[:recipe_id])
    @ingredient = Ingredient.new(ingredient_params)
    @recipe.save
    @ingredient.save
    redirect_to @recipe
  end

  private

  def ingredient_params
    params.require(:ingredient).permit(:quantity, :recipe_id, item_attributes: [:name])
  end

end
