class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients, inverse_of: :recipe
  has_many :items, through: :ingredients

  validates :name, presence: true

  accepts_nested_attributes_for :ingredients

  # , reject_if: lambda {|attributes| attributes['quantity'].blank?}

end
