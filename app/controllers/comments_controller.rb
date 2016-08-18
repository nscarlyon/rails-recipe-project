class CommentsController < ApplicationController
  def new
    @recipe = Recipe.find(params[:recipe_id])
    @comment = Comment.new
  end

  def edit
  end
end
