$(function () {
  $('form#new_recipe').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    var posting = $.post(action, params);

      posting.success(function(data) {
        var recipe = data["recipe"];
        $("#recipeName").text(recipe["name"]);
        $("#recipeContent").text(recipe["content"])
      }) .error(function(response) {
          console.log("Error!", response)
      })
    });
  });
