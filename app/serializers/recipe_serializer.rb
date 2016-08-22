class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name, :content
  has_many :ingredients
  has_many :comments
end
