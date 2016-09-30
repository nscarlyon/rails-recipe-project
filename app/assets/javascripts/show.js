Handlebars.registerHelper('recipeComments', function(comments, options) {
  var out = ""
  for(var i=0, l=comments.length; i<l; i++) {
    out = out + "<p>" + options.fn(comments[i]) + "</p>";
  }
  return out;
});

Handlebars.registerHelper('if', function(comments, options) {
  var currentUser = $('li#currentUser').attr('data-id')
  if(this.user_id == currentUser) {
    return options.fn(this)
  }
});

nextRecipe = function() {
      var nextId = parseInt($(".js-next").attr("data-id")) + 1;
      var currentUser = $('li#currentUser').attr('data-id')

      $.get("/recipes/" + nextId + ".json", function(data) {
        setTemplate()
        var recipe = new Recipe(data);
        var recipeDisplay = recipe.renderDisplay()
        $('#recipeResults').html(recipeDisplay)

        $(".js-next").attr("data-id", recipe["id"]);
      }).fail(function() {
        alert("There are no more recipes!")
      })
    }

showRecipe = function() {
  var currentUser = $('li#currentUser').attr('data-id')
  var recipeId = $('h1').attr('data-id')
  $.get("/recipes/" + recipeId + ".json", function(data) {
    setTemplate()
    var recipe = new Recipe(data);
    var recipeDisplay = recipe.renderDisplay()
    $('#recipeResults').html(recipeDisplay)
  })
}
