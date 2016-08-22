class RecipesSerializer < ActiveModel::Serializer
  attributes :id, :content, :user_id
end
