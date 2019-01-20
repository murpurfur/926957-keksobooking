'use strict';
(function () {
  var SHIFT_PIN_X = 25;
  var SHIFT_PIN_Y = 70;
  var ADS_COUNT = 10;

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
    if (evt.currentTarget.value === 'any') {
      var filteredAds = window.allAds;
    } else {
      filteredAds = window.allAds.filter(function (ad) {
        return ad.offer.type === evt.currentTarget.value;
      });
    }

    // ————— Дублируется из кард.жс Надо вынести в отдельный модуль
    var addedCard = window.utils.map.querySelector('.map__card, .popup');
    if (addedCard) {
      addedCard.remove();
    }

    var drawnPins = window.utils.mapArea.querySelectorAll('.drawn__pin');

    drawnPins.forEach(function (element) {
      element.parentNode.removeChild(element);
    }
    );

    drawPins(filteredAds);
  }
  );


  // ----- Функция вывода пинов на карту
  var drawPins = function (ads) {
    var templatePin = document.querySelector('#pin').content.querySelector('button');
    var fragment = document.createDocumentFragment();
    // -----  Уменьшаю выводимый массив до нужного
    var slicedAds = ads.slice(0, ADS_COUNT);
    for (var i = 0; i < slicedAds.length; i++) {
      var element = templatePin.cloneNode(true);
      element.classList.add('drawn__pin');
      element.style.left = slicedAds[i].location.x - SHIFT_PIN_X + 'px';
      element.style.top = slicedAds[i].location.y - SHIFT_PIN_Y + 'px';
      element.children[0].src = slicedAds[i].author.avatar;
      element.children[0].alt = slicedAds[i].offer.title;
      fragment.appendChild(element);

      // Добавляю слушателя по клику чтобы записать айди пина
      element.addEventListener('click', toClosure(slicedAds[i]));
    }
    return window.utils.mapArea.appendChild(fragment);
  };
  window.drawPins = drawPins;
})();
