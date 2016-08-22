class IngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :unit, :recipe_id, :item_id
  has_one :item
  has_one :recipe
end
