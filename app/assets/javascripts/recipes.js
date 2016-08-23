$(function () {
  $('form#new_recipe').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    var posting = $.post(action, params);

      posting.done(function(data) {
        var recipe = data["recipe"];
        $("#recipeName").text(recipe["name"]);
        $("#recipeContent").text(recipe["content"])
      });
    });
  });
