class RecipesController < ApplicationController

before_action :set_recipe, only: [:edit, :update, :show, :destroy]

  def index
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])
        if @user.nil?
          redirect_to home_path, alert: "User not found"
        else
          @recipes = @user.recipes

          respond_to do |format|
            format.html {render :index}
            format.json {render json: @recipes}
          end
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
    if @recipe.nil?
      redirect_to user_recipes_path(current_user), alert: "Recipe not found"
    end

    respond_to do |format|
      format.html {render :show}
      format.json {render json: @recipe}
    end
  end

  def edit
    @user = User.find(@recipe.user_id)
  end

  def update
     if @recipe.valid?
       @recipe.update(recipe_params)
       redirect_to @recipe, alert: "Recipe successfully updated."
     else
       render :edit
     end
  end

  def destroy
    @recipe.ingredients.clear
    @recipe.destroy
    @recipe.save
    redirect_to user_recipes_path(current_user), alert: "Recipe successfully deleted."
  end

  private

  def set_recipe
    @recipe = Recipe.find_by(id: params[:id])
  end

  def recipe_params
   params.require(:recipe).permit(:name, :user_id, :content,
   ingredients_attributes: [:id, :quantity, :unit, item_attributes: [:name]])
  end

end
