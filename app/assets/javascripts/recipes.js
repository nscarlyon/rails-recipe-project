function Recipe(attributes) {
  this.name = attributes.name;
  this.content = attributes.content;
  this.id = attributes.id;
  this.ingredients = attributes.ingredients;
}

$(function() {
  Recipe.templateSource = $('#recipe-template').html()
  Recipe.template = Handlebars.compile(Recipe.templateSource);
})

Recipe.prototype.renderIngredients = function() {
  this.ingredients.forEach(function(i) {
    return Recipe.template(i)
  })
}

Recipe.prototype.renderDisplay = function() {
  return Recipe.template(this)
}

$(function () {
  $('form#new_recipe').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    var posting = $.post(action, params);

      posting.success(function(data) {
        var recipe = new Recipe(data["recipe"]);
        var recipeDisplay = recipe.renderDisplay()
        var showIngredients = recipe.renderIngredients()

        $('#recipeResults').append(recipeDisplay)
        $('#recipeResults').append(showIngredients)
      })
      .error(function(response) {
          console.log("Error!", response)
      })
    });
  });
