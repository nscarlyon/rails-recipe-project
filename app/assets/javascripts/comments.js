function Comment(attributes) {
  this.content = attributes.content
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
