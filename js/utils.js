'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapArea = document.querySelector('.map__pins');
  var notice = document.querySelector('.notice');
  var addressField = notice.querySelector('#address');

  // ---- Функция ввода адреса
  var fillAddressField = function (x, y) {
    addressField.value = x + ', ' + y;
  };

  // ----- Функция обновления страницы с экрана ошибки
  var closeErrorPopup = function (popup, button, onClose) {
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.remove();
      if (onClose) {
        onClose();
      }
    });
    popup.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.remove();
    });
    window.addEventListener('keydown', function (evt) {
      if (evt.key === 27) {
        evt.preventDefault();
        popup.remove();
      }
    });
  };


  window.utils = {
    map: map,
    mapArea: mapArea,
    notice: notice,
    fillAddressField: fillAddressField,
    closeErrorPopup: closeErrorPopup
  };
})();
