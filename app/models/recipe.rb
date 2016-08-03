class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients
  has_many :items, through: :ingredients

  validates :name, presence: true

  def ingredient_attributes=(ingredient_attributes)
    name = ingredient_attributes[:name]
    Item.find_or_create_by(name)
      self.ingredients.build(recipe_id:, item_id:, quantity: )
    end
  end

end
