class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :user_id
  has_many :ingredients
end
