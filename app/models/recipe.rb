class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients
  has_many :items, through: :ingredients

  validates :name, presence: true

  def items_attributes=(items_attributes)
  items_attributes.values.each do |attribute|
    if attribute != ""
      item = Item.find_or_create_by(attribute)
      self.items << item
    end
  end
end

end
