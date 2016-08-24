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

$(function () {
  $('form#new_recipe').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    var posting = $.post(action, params);

      posting.success(function(data) {
        debugger;
        var recipe = new Recipe(data["recipe"]);
        var recipeDisplay = recipe.renderDisplay()
        $('#recipeResults').append(recipeDisplay)

      }) .error(function(response) {
          console.log("Error!", response)
      })
    });
  });
