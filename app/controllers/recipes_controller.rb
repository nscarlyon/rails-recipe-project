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
    @recipe = Recipe.new
  end

  def create
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
end
