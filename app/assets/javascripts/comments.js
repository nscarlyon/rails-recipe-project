function Comments(attributes) {
  this.comments = attributes.comments
}

Comment.setTemplate = function() {
  Comment.templateSource = $('#comments-template').html()
  Comment.template = Handlebars.compile(Comment.templateSource);
}

Comment.prototype.renderDisplay = function() {
  return Comment.template(this)
}

Comments.nextComments = function() {
  var nextId = parseInt($("#commentsButton").attr("data-id")) + 1;

  $.get("/recipes/" + nextId + "/comments.json", function(data) {
    Comments.setTemplate();

    data["comments"].forEach(function(comment) {
      debugger;
      var comment = new Comment(comment)
      var commentDisplay = comment.renderDisplay()
      $('#commentsResults').html(commentDisplay)
    })
  })
}

$(function () {
  $("#commentsButton").on("click", Comments.nextComments)
})
