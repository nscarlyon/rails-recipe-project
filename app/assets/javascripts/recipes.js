$(function () {
  $('form#new_recipe').submit(function(event) {
    event.preventDefault();
    var $form = $(this);
    var action = $form.attr("action");
    var params = $form.serialize();


    debugger;
    });
  });
