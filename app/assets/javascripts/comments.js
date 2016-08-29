function Comment(attributes) {
  this.id = attributes.id
  this.recipe_id = attributes.recipe_id
  this.content = attributes.content
  this.user_id = attributes.user_id
  this.user = attributes.user
}

Comment.setTemplate = function() {
  Comment.templateSource = $('#comments-template').html()
  Comment.template = Handlebars.compile(Comment.templateSource);
}

Comment.prototype.renderDisplay = function() {
  return Comment.template(this)
}

Comment.nextComments = function() {
  var nextId = parseInt($("#commentsButton").attr("data-id")) + 1;

  $.get("/recipes/" + nextId + "/comments.json", function(data) {
    Comment.setTemplate();

    data["comments"].forEach(function(c) {

      var comment = new Comment(c)
      var commentDisplay = comment.renderDisplay()
      $('#commentsResults').append(commentDisplay)
      debugger;
    })
  })
}

$(function () {
  $("#commentsButton").on("click", Comment.nextComments)
})
