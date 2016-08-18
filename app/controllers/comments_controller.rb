class CommentsController < ApplicationController
  def new
    @recipe = Recipe.find(params[:recipe_id])
    @comment = Comment.new
  end



  def edit
  end

  private

    def comment_params
      params.require(:comment).permit(:content, :user_id, :recipe_id)
    end
end
