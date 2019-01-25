'use strict';
(function () {
  var form = window.utils.notice.querySelector('.ad-form');
  // ----- Функция при удачной отправке данных
  var onSuccess = function () {
    window.main.appendChild(successMessage);
    window.pageReset();
    var successPopup = document.querySelector('.success');
    window.utils.closeSuccessPopup(successPopup);

  };
  // ----- Функция вывода ошибки при передаче данных и закрытия окна
  var showError = function (text) {
    var errorMessage = document.querySelector('#error').content.querySelector('.error');
    var errorMessageClone = errorMessage.cloneNode(true);
    errorMessage.children[0].textContent = text;
    window.main.appendChild(errorMessageClone);
    var errorButton = document.querySelector('.error__button');
    var errorPopup = document.querySelector('.error');
    window.utils.closeErrorPopup(errorPopup, errorButton);
  };
  // ----- Мапа для мин цены в зависимости от типа
  var typeSelect = window.utils.notice.querySelector('#type');
  var priceField = window.utils.notice.querySelector('#price');
  var typePriceMap = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };

  // ----- Изменение мин стоимости от типа объекта
  typeSelect.addEventListener('change', function (evt) {
    priceField.placeholder = typePriceMap[evt.target.value];
    priceField.min = typePriceMap[evt.target.value];
  });

  // ----- Функция обновления мин стоимости жилья на дефолтное
  var resetPriceField = function (propertyType) {
    priceField.min = typePriceMap[propertyType];
    priceField.placeholder = typePriceMap[propertyType];
  };

  window.resetPriceField = resetPriceField;

  // ----- Автоподставление времени заезда/выезда
  var timeIn = window.utils.notice.querySelector('#timein');
  var timeOut = window.utils.notice.querySelector('#timeout');

  timeIn.addEventListener('change', function (evt) {
    timeOut.value = evt.target.value;
  });

  timeOut.addEventListener('change', function (evt) {
    timeIn.value = evt.target.value;
  });

  // ----- Ограничение на количество комнат и количество гостей
  var roomNumber = window.utils.notice.querySelector('#room_number');
  var capacity = window.utils.notice.querySelector('#capacity');

  roomNumber.addEventListener('change', function (evt) {
    if (Number(evt.target.value) === 1 && Number(capacity.value) !== 1) {
      evt.target.setCustomValidity('');
      capacity.setCustomValidity('В одну комнату может заселиться только один гость');
    } else if (Number(evt.target.value) === 2 && Number(capacity.value) < 1 || Number(capacity.value) > 2) {
      evt.target.setCustomValidity('');
      capacity.setCustomValidity('В две комнаты могут заселиться только двое или один гость');
    } else if (Number(evt.target.value) === 3 && Number(capacity.value) <= 0) {
      evt.target.setCustomValidity('');
      capacity.setCustomValidity('В три комнаты поместятся один, два или три гостя');
    } else if (Number(evt.target.value) === 100 && Number(capacity.value) > 0) {
      evt.target.setCustomValidity('');
      capacity.setCustomValidity('Стокомнатная недвижимость не для гостей!');
    } else {
      evt.target.setCustomValidity('');
    }
  });
  capacity.addEventListener('change', function (evt) {
    if (Number(evt.target.value) === 1 && Number(roomNumber.value) !== 1) {
      evt.target.setCustomValidity('');
      roomNumber.setCustomValidity('Для одного гостя подойдет одна, две или три комнаты');
    } else if (Number(evt.target.value) === 2 && Number(roomNumber.value) < 2 || Number(roomNumber.value) >= 100) {
      evt.target.setCustomValidity('');
      roomNumber.setCustomValidity('Для двух гостей будут впору две или три комнаты');
    } else if (Number(evt.target.value) === 3 && Number(roomNumber.value) !== 3) {
      evt.target.setCustomValidity('');
      roomNumber.setCustomValidity('Трём гостям подойдут трёхкомнатные помещения');
    } else if (Number(evt.target.value) === 0 && Number(roomNumber.value) !== 100) {
      evt.target.setCustomValidity('');
      roomNumber.setCustomValidity('Не для гостей можно выбрать только сто комнат!');
    } else {
      evt.target.setCustomValidity('');
    }
  });

  // ----- Отправка формы
  var successMessage = document.querySelector('#success').content.querySelector('.success');
  var errorMessage = document.querySelector('#error').content.querySelector('.error');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    if (form.checkValidity()) {
      window.send(formData, onSuccess, showError);
    } else {
      window.main.appendChild(errorMessage);
    }
  });
})();
