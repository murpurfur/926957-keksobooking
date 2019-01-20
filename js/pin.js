'use strict';
(function () {
  var SHIFT_PIN_X = 25;
  var SHIFT_PIN_Y = 70;
  // var ADS_COUNT = 5;

  // ----- Функция слушателя записывающая айди пина
  var toClosure = function (adObject) {
    return function handler() {
      window.generateCard(adObject);
    };
  };

  // ----- Переменные для фильтрации пинов на карте
  var mapFilters = document.querySelector('.map__filters');
  var typeMapFilter = mapFilters.querySelector('#housing-type');


  typeMapFilter.addEventListener('change', function (evt) {
    var filteredAds = window.allAds.filter(function (ad) {
      return ad.offer.type === evt.currentTarget.value;
    });
    var drawnPins = window.utils.mapArea.querySelectorAll('.map__pin');
    console.log(drawnPins);
    drawnPins.removeChild(1);

    drawPins(filteredAds);
  }
  );


  // ----- Функция вывода пинов на карту
  var drawPins = function (ads) {
    var templatePin = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();
    // -----  Уменьшаю выводимый массив до нужного
    // var slicedAds = ads.slice(0, ADS_COUNT);
    for (var i = 0; i < ads.length; i++) {
      var element = templatePin.cloneNode(true);
      element.style.left = ads[i].location.x - SHIFT_PIN_X + 'px';
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
