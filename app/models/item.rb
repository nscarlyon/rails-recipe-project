class Item < ApplicationRecord
  has_many :ingredients
  has_many :recipes, through: :ingredients

#  validates :name, allow_blank: true
end
