"use strict";
$(function() {
  $(".colorpicker").colorpicker();

  initBasicSelect();
  
});

function initBasicSelect() {

  $("select").formSelect();
  var data = [
    { id: 1, name: "Option 1" },
    { id: 2, name: "Option 2" },
    { id: 3, name: "Option 3" }
  ];
}
