'use strict';
(function () {
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapArea = document.querySelector('.map__pins');
  var notice = document.querySelector('.notice');
  var addressField = notice.querySelector('#address');
  var ESC_CODE = 27;

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
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        evt.preventDefault();
        popup.remove();
      }
    });
  };
  // ----- Функция обновления страницы с экрана успеха
  var closeSuccessPopup = function (popup) {
    popup.addEventListener('click', function (evt) {
      evt.preventDefault();
      popup.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_CODE) {
        evt.preventDefault();
        popup.remove();
      }
    });
  };

  window.utils = {
    main: main,
    map: map,
    mapArea: mapArea,
    notice: notice,
    fillAddressField: fillAddressField,
    closeErrorPopup: closeErrorPopup,
    closeSuccessPopup: closeSuccessPopup
  };
})();
