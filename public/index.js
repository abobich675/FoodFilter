import * as gemini from './api/Gemini.js';

function insertImage() {
    img = gemini.generateImage("Tomato");
}

window.addEventListener('DOMContentLoaded', function () {

  var addQuoteButton = document.getElementById('go-button');
  addQuoteButton.addEventListener('click', insertImage);

});