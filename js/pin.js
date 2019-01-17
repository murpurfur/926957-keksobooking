'use strict';
(function () {
  var SHIFT_PIN_X = 25;
  var SHIFT_PIN_Y = 70;

  // ----- Функция слушателя записывающая айди пина
  var toClosure = function (adObject) {
    return function handler() {
      window.generateCard(adObject);
    };
  };

  // ----- Функция вывода пинов на карту
  var drawPins = function (ads) {
    var templatePin = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      var element = templatePin.cloneNode(true);
      element.style.left = ads[i].location.x + SHIFT_PIN_X + 'px';
      element.style.top = ads[i].location.y + SHIFT_PIN_Y + 'px';
      element.children[0].src = ads[i].author.avatar;
      element.children[0].alt = ads[i].offer.title;
      fragment.appendChild(element);

      // Добавляю слушателя по клику чтобы записать айди пина
      element.addEventListener('click', toClosure(ads[i]));
    }
    return window.utils.mapArea.appendChild(fragment);
  };
  window.drawPins = drawPins;
})();
