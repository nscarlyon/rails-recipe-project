function Recipe(attributes) {
  this.name = attributes.name;
  this.content = attributes.content;
  this.id = attributes.id;
  this.ingredients = attributes.ingredients;
}

Recipe.templateSource = $('#recipe-template').html()
Recipe.template = Handlebars.compile(Recipe.templateSource);

Recipe.prototype.renderDisplay = function() {

}

$(function () {
  $('form#new_recipe').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    var posting = $.post(action, params);

      posting.success(function(data) {
        var recipe = new Recipe(data);
        var recipeDisplay = recipe.renderDisplay()

        var recipe = data["recipe"];
        $("#recipeName").text(recipe["name"]);
        $("#recipeContent").text(recipe["content"])
      }) .error(function(response) {
          console.log("Error!", response)
      })
    });
  });
