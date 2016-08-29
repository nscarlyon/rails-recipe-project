class CommentsController < ApplicationController

  before_action :set_recipe

  def index
    @comments = Recipe.find(params[:recipe_id]).comments
    respond_to do |f|
      f.json {render json: @comments}
      f.html {render :index}
    end
  end

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

  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end

  def edit
    @comment = Comment.find(params[:id])
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
  end

  private

    def set_recipe
      @recipe = Recipe.find_by(id: params[:recipe_id])
    end

    def comment_params
      params.require(:comment).permit(:content, :user_id, :recipe_id)
    end
end
