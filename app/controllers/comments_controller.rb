class CommentsController < ApplicationController
  def new
    @recipe = Recipe.find(params[:recipe_id])
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @recipe = Recipe.find(params[:recipe_id])
    @recipe.comments << @comment
    @recipe.save
    @comment.save
    redirect_to @recipe, alert: "Comment successfully added."
  end

  def edit
  end

  private

    def comment_params
      params.require(:comment).permit(:content, :user_id, :recipe_id)
    end
end
