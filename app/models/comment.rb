class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :recipe

  validates_presence_of :content, :user_id, :recipe_id

end
