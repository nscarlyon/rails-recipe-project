function Recipe(attributes) {
  this.name = attributes.name;
  this.content = attributes.content;
  this.id = attributes.id;
  this.user_id = attributes.user_id;
  this.ingredients = attributes.ingredients;
  this.comments = attributes.comments;
}

Recipe.prototype.renderDisplay = function() {
  return Recipe.template(this)
}

Recipe.setTemplate = function() {
  Recipe.templateSource = $('#recipe-template').html()
  Recipe.template = Handlebars.compile(Recipe.templateSource);
}

Handlebars.registerHelper('list', function(ingredients, options) {
  var out = "<ul>";
  for(var i=0, l=ingredients.length; i<l; i++) {
    out = out + "<li>" + options.fn(ingredients[i]) + "</li>";
  }
  return out + "</ul>";
});

Handlebars.registerHelper('recipeComments', function(comments, options) {
  var out = ""
  for(var i=0, l=comments.length; i<l; i++) {
    out = out + "<p>" + options.fn(comments[i]) + "</p>";
  }
  return out;
});

Handlebars.registerHelper('if', function(comments, options) {
  var currentUser = $('li#currentUser').attr('data-id')
  var link;

  if (options.data) {
   data = Handlebars.createFrame(options.data);
  }

  for(var i=0, l=comments.length; i<l; i++) {
    debugger;
    if (data) {
     data.recipeId = data.root.id;
   }
    if(currentUser == comments[i].user.id) {
      link += options.fn(comments[i], { data: data })
    }
  }
  return link;
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
  Recipe.setTemplate()
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
        Recipe.setTemplate()
        var recipe = new Recipe(data["recipe"]);
        var recipeDisplay = recipe.renderDisplay()
        $('#recipeResults').html(recipeDisplay)

        var currentUser = $('li#currentUser').attr('data-id')

         var recipeId = data["recipe"]["id"]
        $(".commentLink").html(`<a href="/recipes/${recipeId}/comments/new">Add comment</a>`)
        $(".js-next").attr("data-id", recipe["id"]);
      });
    }

Recipe.more = function() {
        var id = $(this).data("id")

        $.get("/recipes/" + id + ".json", function(data) {
          Recipe.setTemplate()
          var recipe = new Recipe(data["recipe"]);
          var recipeDisplay = recipe.renderDisplay()
          $('#recipeResults-' + id).html(recipeDisplay)
        })
      }

$(function () {
  $('form#new_recipe').submit(Recipe.formSubmit)
  $(".js-next").on("click", Recipe.nextRecipe)
  $('.js-more').on("click", Recipe.more)
})
