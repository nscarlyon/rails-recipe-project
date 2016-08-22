class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :name
  has_many :ingredients
end
