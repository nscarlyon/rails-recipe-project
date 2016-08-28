function Comment(attributes) {
  this.id = attributes.id;
  this.content = attributes.content;
  this.recipe_id = attributes.recipe_id;
  this.user_id = attributes.user_id;
  this.user.email = attributes.user.email;
}


var nextComments = function() {
  var nextId = parseInt($(".js-next").attr("data-id")) + 1;
  $.get("/recipes/" + nextId + "/comments", function(data) {
      data["comments"].forEach(function(comment) {
        var comment = new Comment(comment)
        var recipeComments = []
        recipeComments.push(comment)
      })
  });
}

$(function () {
  $(".js-next").on("click", nextComments)
})
