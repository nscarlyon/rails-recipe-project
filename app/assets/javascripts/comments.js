function Comment(attributes) {
  this.id = attributes.id;
  this.content = attributes.content;
  this.recipe_id = attributes.recipe_id;
  this.user_id = attributes.user_id;
  this.user = attributes.user;
}

var nextComments = function() {
  var nextId = parseInt($(".js-next").attr("data-id")) + 1;
  var recipeComments = []

  $.get("/recipes/" + nextId + "/comments", function(data) {
      data["comments"].forEach(function(comment) {
        var comment = new Comment(comment)
        recipeComments.push(comment)
      })
      console.log(recipeComments)
  });
}

$(function () {
  $(".js-next").on("click", nextComments)
})
