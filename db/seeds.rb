# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!(email: "test@gmail.com", password: "password")
recipe = Recipe.create!(user_id: 1, name: "Yummy BBQ Chicken", content: "Step 1. fjie;awfjeiw;f Step 2. fjei;wafe")
Item.create!(name: "chicken")
Item.create!(name: "BBQ Sauce")
Item.create!(name: "corn")
recipe.ingredients.create!(item_id: 1, quantity: "6", unit: "oz")
recipe.ingredients.create!(item_id: 2, quantity: "1", unit: "cup")
recipe.ingredients.create!(item_id: 3, quantity: "3", unit: "")
