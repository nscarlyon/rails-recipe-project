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
  var nextId = parseInt($(".js-next").attr("data-id")) + 1;

  $.get("/recipes/" + nextId + "/comments", function(data) {
    Comments.setTemplate();
    var comments = new Comments(data)
    var commentsDisplay = comments.renderDisplay()
    $('#commentsResults').html(commentsDisplay)
  })
}

$(function () {
  $(".js-next").on("click", Comments.nextComments)
})
