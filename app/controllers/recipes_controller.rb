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
    @user = current_user
    @recipe = Recipe.new
  end

  def create
    @recipe = Recipe.new(recipe_params)

    if @recipe.valid?
      @recipe.save
      redirect_to @recipe, notice: "Recipe successfully created."
    else
      @user = current_user
      render action: 'new'
    end
  end

  def show
    @recipe = Recipe.find_by(id: params[:id])
    if @recipe.nil?
      redirect_to user_recipes_path(current_user), alert: "Recipe not found"
    end
end

  def edit
    @recipe = Recipe.find(params[:id])
    @user = User.find(@recipe.user_id)
  end

  def update
     @recipe = Recipe.find(params[:id])
     @recipe.update(recipe_params)
     redirect_to @recipe
  end

  private

  def recipe_params
   params.require(:recipe).permit(:name, :user_id,
   ingredients_attributes: [:id, :quantity, item_attributes: [:name]])
  end

end
