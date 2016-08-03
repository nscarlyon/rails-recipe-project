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
    @user = User.find(params[:id])
    @recipe = Recipe.new
    @ingredients = @recipe.ingredients.build
    @item = @ingredients.build_item
  end

  def create
    @recipe = Recipe.new(recipe_params)
    current_user.recipes << @recipe
    current_user.save
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
   params.require(:recipe).permit(:id, :name, ingredients_attributes: [:id, :quantity, item_attributes: [:name, :id]])
  end

end
