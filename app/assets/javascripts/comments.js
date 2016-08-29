function Comments(attributes) {
  this.comments = attributes.comments
}

Comments.setTemplate = function() {
  Comments.templateSource = $('#comments-template').html()
  Comments.template = Handlebars.compile(Comments.templateSource);
}

Comments.prototype.renderDisplay = function() {
  return Comments.template(this)
}

Comments.nextComments = function() {
  var nextId = parseInt($("#commentsButton").attr("data-id")) + 1;

  $.get("/recipes/" + nextId + "/comments.json", function(data) {
    Comments.setTemplate();

    data["comments"].forEach(function(comment) {
      debugger;
      var comments = new Comments(comment)
      var commentsDisplay = comments.renderDisplay()
      $('#commentsResults').html(commentsDisplay)
    })
  })
}

$(function () {
  $("#commentsButton").on("click", Comments.nextComments)
})
