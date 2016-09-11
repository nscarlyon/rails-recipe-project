class CommentsController < ApplicationController

  before_action :set_recipe

  def new
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)

    if @comment.valid?
      @recipe.comments << @comment
      @recipe.save
      @comment.save
      redirect_to @recipe, alert: "Comment successfully added."
    else
      render :new
    end
  end

  def edit
    @comment = Comment.find(params[:id])
    if @comment.user_id != current_user.id
      redirect_to user_recipes_path(current_user), alert: "You may not delete this comment!"
    end
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update(comment_params)
    @comment.save
    redirect_to @recipe
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    @recipe.save
    redirect_to @recipe, alert: "Comment successfully deleted."

    if @comment.user_id != current_user.id
      redirect_to user_recipes_path(current_user), alert: "You may not delete this comment."
    end
  end

  private

    def set_recipe
      @recipe = Recipe.find_by(id: params[:recipe_id])
    end

    def comment_params
      params.require(:comment).permit(:content, :user_id, :recipe_id)
    end
end
