'use strict';
(function () {

  var FILTER_TYPE_ANY = 'any';
  // ----- Переменные для фильтрации пинов на карте
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterType = mapFilters.querySelector('#housing-type');
  var mapFilterPrice = mapFilters.querySelector('#housing-price');
  var mapFilterRooms = mapFilters.querySelector('#housing-rooms');
  var mapFilterGuests = mapFilters.querySelector('#housing-guests');
  var mapFilterFeatures = mapFilters.querySelectorAll('.map__checkbox');

  mapFilterType.addEventListener('change', function (evt) {
    if (evt.currentTarget.value === FILTER_TYPE_ANY) {
      var filteredAds = window.allAds;
    } else {
      filteredAds = window.allAds.filter(function (ad) {
        return ad.offer.type === evt.currentTarget.value;
      });
    }
    var addedCard = window.utils.map.querySelector('.map__card, .popup');
    if (addedCard) {
      addedCard.remove();
    }
    var drawnPins = window.utils.mapArea.querySelectorAll('.drawn__pin');
    drawnPins.forEach(function (element) {
      element.parentNode.removeChild(element);
    }
    );
    window.drawPins(filteredAds);
  }
  );

  

})();
