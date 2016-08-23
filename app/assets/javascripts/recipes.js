$(function () {
  $('form#new_recipe').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    debugger;
    $.ajax({
        url: action,
        method: "POST",
        dataType: "json",
        data: params,
      })
      .success(function(data) {
        var recipe = data["recipe"];
        $("#recipeName").text(recipe["name"]);
        $("#recipeContent").text(recipe["content"])
      })
      .error(function(response) {
        console.log("Something Broke", response)
      })
      });
    });
