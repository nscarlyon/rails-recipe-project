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

Recipe.prototype.renderDisplay = function() {
  return Recipe.template(this)
}

Handlebars.registerHelper('list', function(ingredients, options) {
  var out = "<ul>";
  for(var i=0, l=ingredients.length; i<l; i++) {
    out = out + "<li>" + options.fn(ingredients[i]) + "</li>";
  }
  return out + "</ul>";
});

Recipe.success = function(data) {
  var recipe = new Recipe(data["recipe"]);
  var recipeDisplay = recipe.renderDisplay()

  $('#recipeResults').append(recipeDisplay)
}

Recipe.error = function(response) {
  console.log("Error!", response)
}

Recipe.formSubmit = function(event) {
  event.preventDefault();
  var $form = $(this);
  var action = $form.attr("action");
  var params = $form.serialize();
  var posting = $.post(action, params);

    posting.success(Recipe.success)
    .error(Recipe.error)
  }

$(function () {
  $('form#new_recipe').submit(Recipe.formSubmit)
  });
