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

setTemplate = function() {
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

formSubmit = function(event) {
  setTemplate()
  var $form = $(this);
  var action = $form.attr("action");
  var params = $form.serialize();
  debugger
      if (validateForm()) {
        event.preventDefault();
        var posting = $.post(action, params);
        posting.success(success)
      }
  }

  validateForm = function() {
    var rName = document.getElementById("recipe_name").value
    var rContent = document.getElementById("recipe_content").value
    var iName = document.getElementById("recipe_ingredients_attributes_0_item_attributes_name").value
    var iQuantity = document.getElementById("recipe_ingredients_attributes_0_quantity").value
    var iUnit = document.getElementById("recipe_ingredients_attributes_0_unit").value

    return (rName != rContent && rContent != iName && iName != iQuantity && iQuantity != iUnit && iUnit != "")
  }

  success = function(data) {
    $('#new_recipe')[0].reset()
    $('#new_recipe input:submit').prop('disabled', false)
    var recipe = new Recipe(data);
    var recipeDisplay = recipe.renderDisplay()

    $('#recipeResults').append(recipeDisplay)
  }

  addListeners = function() {
    $('form#new_recipe').submit(formSubmit)
    $(".js-addItem").on("click", addItem)
    $(".js-remove").on("click", removeItem)
  }
