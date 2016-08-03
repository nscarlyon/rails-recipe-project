class RecipesController < ApplicationController

  def index
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])
        if @user.nil?
          redirect_to home_path, alert: "User not found"
        else
          @recipes = @user.recipes
        end
    else
        @recipes = Recipe.all
      end
  end

  def new
    @user = User.find(params[:user_id])
    @recipe = Recipe.new
    @recipe.ingredients.build.build_item
  end

  def create
    @recipe = Recipe.new(recipe_params)
  #  @recipe.ingredients.build << Ingredient.new(params[:ingredients_attributes]["0"])
    @recipe.save
    redirect_to @recipe
  end

  def show
  if params[:recipe_id]
    @user = User.find_by(id: params[:user_id])
    @recipe = @user.recipes.find_by(id: params[:id])
    if @recipe.nil?
      redirect_to user_recipes_path(@user), alert: "Recipe not found"
    end
  else
    @recipe = Recipe.find(params[:id])
  end
end

  def edit
  end

  private

  def recipe_params
   params.require(:recipe).permit(:name, :user_id,
   ingredients_attributes: [:id, :quantity, item_attributes: [:id, :name]])
  end

end
