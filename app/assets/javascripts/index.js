function Recipes(attributes) {
  this.recipes = attributes
}

Recipes.setTemplate = function() {
  Recipes.templateSource = $('#recipes-template').html()
  Recipes.template = Handlebars.compile(Recipes.templateSource);
}

Recipes.prototype.renderDisplay = function() {
  return Recipes.template(this)
}

Handlebars.registerHelper('each', function(recipes, options) {
  var out = "<ol>";
  for(var i=0, l=recipes.length; i<l; i++) {
    out = out + "<li>" + options.fn(recipes[i]) + "</li>";
  }
  return out + "</ol>";
});

Recipes.index = function() {
  var userId = $('li#currentUser').attr('data-id')
  $.get('/users/'+ userId + '/recipes.json', function(data) {
    Recipes.setTemplate()
    var recipes = new Recipes(data)
    var recipesDisplay = recipes.renderDisplay()
    $('#recipesResults').html(recipesDisplay)
  })
}
