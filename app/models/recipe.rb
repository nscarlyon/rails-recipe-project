class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients, inverse_of: :recipe
  has_many :items, through: :ingredients

  validates_presence_of :name, :content

  accepts_nested_attributes_for :ingredients

end
