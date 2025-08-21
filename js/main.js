'use strict';

(function () {
  // Получаем основные элементы
  var mapElement = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  
  // Константы для ограничений координат
  var MAP_PIN_WIDTH = 65;
  var MAP_PIN_HEIGHT = 65;
  var MAP_PIN_TAIL_HEIGHT = 22;
  var MAP_WIDTH = mapElement.offsetWidth;
  var MAP_HEIGHT = mapElement.offsetHeight - mapFiltersContainer.offsetHeight;
  
  // Ограничения для перемещения пина
  var PIN_X_MIN = MAP_PIN_WIDTH / 2;
  var PIN_X_MAX = MAP_WIDTH - MAP_PIN_WIDTH / 2;
  var PIN_Y_MIN = 130; // Отступ сверху
  var PIN_Y_MAX = MAP_HEIGHT - MAP_PIN_HEIGHT - MAP_PIN_TAIL_HEIGHT;
  
  // Функция для получения координат пина
  function getPinCoordinates(pinElement) {
    var pinLeft = parseInt(pinElement.style.left, 10);
    var pinTop = parseInt(pinElement.style.top, 10);
    
    // Координаты центра пина (для адреса)
    var centerX = pinLeft + MAP_PIN_WIDTH / 2;
    var centerY = pinTop + MAP_PIN_HEIGHT + MAP_PIN_TAIL_HEIGHT;
    
    return {
      x: centerX,
      y: centerY
    };
  }
  
  // Функция для обновления поля адреса
  function updateAddressField() {
    var coordinates = getPinCoordinates(mapPinMain);
    addressInput.value = coordinates.x + ', ' + coordinates.y;
  }
  
  // Инициализация адреса при загрузке
  updateAddressField();
  
  // Переменные для отслеживания состояния перетаскивания
  var isDragging = false;
  var startCoords = {
    x: 0,
    y: 0
  };
  var pinOffset = {
    x: 0,
    y: 0
  };
  
  // Обработчик начала перетаскивания
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    
    isDragging = true;
    
    // Сохраняем начальные координаты мыши
    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;
    
    // Вычисляем смещение мыши относительно пина
    var pinRect = mapPinMain.getBoundingClientRect();
    pinOffset.x = evt.clientX - pinRect.left;
    pinOffset.y = evt.clientY - pinRect.top;
    
    // Добавляем обработчики для перемещения и отпускания
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  
  // Обработчик перемещения мыши
  function onMouseMove(evt) {
    if (!isDragging) {
      return;
    }
    
    evt.preventDefault();
    
    // Получаем координаты карты
    var mapRect = mapElement.getBoundingClientRect();
    
    // Вычисляем новые координаты пина
    var newPinX = evt.clientX - mapRect.left - pinOffset.x;
    var newPinY = evt.clientY - mapRect.top - pinOffset.y;
    
    // Ограничиваем координаты пина в пределах карты
    newPinX = Math.max(PIN_X_MIN - MAP_PIN_WIDTH / 2, Math.min(newPinX, PIN_X_MAX - MAP_PIN_WIDTH / 2));
    newPinY = Math.max(PIN_Y_MIN, Math.min(newPinY, PIN_Y_MAX));
    
    // Применяем новые координаты
    mapPinMain.style.left = newPinX + 'px';
    mapPinMain.style.top = newPinY + 'px';
    
    // Обновляем поле адреса
    updateAddressField();
  }
  
  // Обработчик отпускания мыши
  function onMouseUp(evt) {
    if (!isDragging) {
      return;
    }
    
    evt.preventDefault();
    isDragging = false;
    
    // Удаляем обработчики
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
  
  // Предотвращаем стандартное поведение перетаскивания изображения
  mapPinMain.querySelector('img').addEventListener('dragstart', function (evt) {
    evt.preventDefault();
  });
  
})();