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

Recipe.nextRecipe = function() {
      var nextId = parseInt($(".js-next").attr("data-id")) + 1;
      $.get("/recipes/" + nextId + ".json", function(data) {
        var recipe = new Recipe(data["recipe"]);
        var recipeDisplay = recipe.renderDisplay()
        $('#recipeResults').html(recipeDisplay)

        // $(".comments").text("");
        // var recipeId = recipe["id"]
        // $(".commentLink").html(`<a href="/recipes/${recipeId}/comments/new">Add comment</a>`)
        //
        //
        // recipe["comments"].forEach(function(c) {
        //   var commentText = "<p>"
        //   commentText += c.content
        //   commentText += "~by <strong>" + c.user.email + "</strong> <br>"
        //   commentText += "</p>"
        //   $(".comments").append(commentText);
        // })

        $(".js-next").attr("data-id", recipe["id"]);
      });
    }

$(function () {
  $('form#new_recipe').submit(Recipe.formSubmit)
  $(".js-next").on("click", Recipe.nextRecipe)
})
