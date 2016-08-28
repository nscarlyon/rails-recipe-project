class CommentsController < ApplicationController
  def index
    @comments = Recipe.find(params[:recipe_id]).comments
    render json: @comments
  end

  def new
    @recipe = Recipe.find(params[:recipe_id])
    @comment = Comment.new
  end

  def create
    @comment = Comment.new(comment_params)
    @recipe = Recipe.find(params[:recipe_id])

    if @comment.valid?
      @recipe.comments << @comment
      @recipe.save
      @comment.save
      redirect_to @recipe, alert: "Comment successfully added."
    else
      render :new
    end
  end

  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end

  def edit
    @recipe = Recipe.find(params[:recipe_id])
    @comment = Comment.find(params[:id])
  end

  def update
    @recipe = Recipe.find(params[:recipe_id])
    @comment = Comment.find(params[:id])
    @comment.update(comment_params)
    @comment.save
    redirect_to @recipe
  end

  def destroy
    @recipe = Recipe.find(params[:recipe_id])
    @comment = Comment.find(params[:id])
    @comment.destroy
    @recipe.save
    redirect_to @recipe, alert: "Comment successfully deleted."
  end

  private

    def comment_params
      params.require(:comment).permit(:content, :user_id, :recipe_id)
    end
end
