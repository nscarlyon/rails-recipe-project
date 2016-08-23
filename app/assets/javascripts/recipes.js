$(function () {
  $('form#new_recipe').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();
    $.ajax({
        url: action,
        data: params,
        dataType: "json",
        method: "POST",
      })
      .success(function(data) {
        debugger;
        var recipe = data["recipe"];
        $("#recipeName").text(recipe["name"]);
        $("#recipeContent").text(recipe["content"])
      })
      .error(function(response) {
        console.log("Something Broke", response)
      })
      });
    });
