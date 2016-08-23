$(function () {
  $('form').submit(function(event) {
    event.preventDefault();
    var values = $(this).serialize();
    var posting = $.post('/recipes', values);
    posting.done(function(data) {
      var recipe = data["recipe"];
      $("#recipeName").text(recipe["name"]);
      $("#recipeContent").text(recipe["content"])
    });
  });
});
