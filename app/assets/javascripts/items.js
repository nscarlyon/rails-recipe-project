addItem = function(event) {
  var id = $("input:text:last-of-type").length
  var inputName = document.createElement("input");
  inputName.name = `recipe[ingredients_attributes][${id}][item_attributes][name]`;
  inputName.type = "text";
  inputName.id = `recipe_ingredients_attributes_${id}_item_attributes_name`;

  var inputQuantity = document.createElement("input");
  inputQuantity.name = `recipe[ingredients_attributes][${id}][quantity]`;
  inputQuantity.type = "text";
  inputQuantity.id = `recipe_ingredients_attributes_${id}_quantity`;

  var inputUnit = document.createElement("input");
  inputUnit.name = `recipe[ingredients_attributes][${id}][unit]`;
  inputUnit.type = "text";
  inputUnit.id = `recipe_ingredients_attributes_${id}_unit`;

  var itemDiv = document.createElement("div");
  itemDiv.id = id;
  $('#items').append(itemDiv);
  $(`div #${id}`).addClass("item");
  $(`div #${id}`).append("Item Name:", inputName, "Quantity:", inputQuantity, "Unit:", inputUnit);
  $(".js-addItem").attr("data-id", id);
}

removeItem = function() {
  var item = document.getElementById("items");
  item.removeChild(item.lastChild);
}
