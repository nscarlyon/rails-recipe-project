class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients, inverse_of: :recipe
  has_many :items, through: :ingredients

  validates_presence_of :name

  accepts_nested_attributes_for :ingredients, reject_if: proc {|attributes| attributes['name'].blank?}

  # , reject_if: lambda {|attributes| attributes['quantity'].blank?}

end
