function Comments(attributes) {
  this.comments = attributes.comments
}

Comments.setTemplate = function() {
  Comments.templateSource = $('#comments-template').html()
  Comments.template = Handlebars.compile(Comments.templateSource);
}

var nextComments = function() {
  var nextId = parseInt($(".js-next").attr("data-id")) + 1;

  $.get("/recipes/" + nextId + "/comments", function(data) {
    Comments.setTemplate();
    var comments = new Comments(data)

  })
}

$(function () {
  $(".js-next").on("click", nextComments)
})
