class Ingredient < ApplicationRecord
  belongs_to :item
  belongs_to :recipe

  validates :quantity, presence: true

  # accepts_nested_attributes_for :item

  def item_attributes=(item_attributes)
    item_attributes.values.each do |item_attribute|
      if item_attribute != ""
      new_item = Item.find_or_create_by(name: item_attribute)
      self.item = new_item
    end
  end
end

end
