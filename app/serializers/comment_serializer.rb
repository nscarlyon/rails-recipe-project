class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :recipe_id, :user_id
  has_one :user
end
