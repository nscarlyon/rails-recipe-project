# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.find_by(email: "new_email1@gmail.com")
recipe = Recipe.create!(user: user, name: "Yummy BBQ Chicken")
Item.create!(name: "chicken")
Item.create!(name: "BBQ Sauce")
Item.create!(name: "corn")
recipe.ingredients.create!(item: 1, quantity: 6)
recipe.ingredients.create!(item: 2, quantity: 1)
recipe.ingredients.create!(item: 3, quantity: 3)
