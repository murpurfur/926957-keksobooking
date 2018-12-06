/* eslint-disable strict */
'use strict';

var map = document.querySelector('.map');
var mapArea = document.querySelector('.map__pins');

map.classList.remove('map--faded');

/* ----- Функция для генерации массива объектов */
var generateObjectList = function () {
  var getRandomValue = function (start, end) {
    return Math.floor(Math.random() * end + start);
  };

  var typesList = ['palace', 'flat', 'house', 'bungalo'];

  var checkInOutTime = ['12:00', '13:00', '14:00'];

  var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var photosList = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var titlesList = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var avatarNumbers = [];

  for (var avatarCount = 1; avatarCount <= 8; avatarCount++) {
    avatarNumbers.push(avatarCount);
  }

  /* ----- Генерирую массив случайных объявлений */
  var objects = [];

  for (var i = 0; i < 8; i++) {
    var randomIndex = getRandomValue(0, avatarNumbers.length - 1);
    var randomStringNumber = getRandomValue(0, titlesList.length);
    var locationX = getRandomValue(1, mapArea.scrollWidth);
    var locationY = getRandomValue(130, 630);
    var featuresListRandom = getRandomValue(0, featuresList.length - 1);

    objects.push({
      author: {
        avatar: 'img/avatars/user0' + avatarNumbers[randomIndex] + '.png'
      },
      offer: {
        title: titlesList.splice(randomStringNumber, 1)[0],
        address: locationX + ', ' + locationY,
        price: getRandomValue(1000, 1000000),
        type: typesList[getRandomValue(0, typesList.length - 1)],
        rooms: getRandomValue(1, 5),
        guests: getRandomValue(1, 8),
        checkin: checkInOutTime[getRandomValue(0, 2)],
        checkout: checkInOutTime[getRandomValue(0, 2)],
        features: featuresList.slice(0, featuresListRandom),
        description: '',
        photos: photosList
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
    avatarNumbers.splice(randomIndex, 1);
  }
  return objects;
};

/* ----- Запускаю функцию генерации объектов */
var objectList = generateObjectList();

/* ----- Функция вывода пинов на карту */
var drawPins = function (objects) {
  var templatePin = document.querySelector('#pin').content.querySelector('button');
  var fragment = document.createDocumentFragment();

  for (var pinCount = 0; pinCount < objects.length; pinCount++) {
    var element = templatePin.cloneNode(true);
    element.style.left = objects[pinCount].location.x + 50 * 0.5 + 'px';
    element.style.top = objects[pinCount].location.y + 70 + 'px';
    element.children[0].src = objects[pinCount].author.avatar;
    element.children[0].alt = objects[pinCount].offer.title;
    fragment.appendChild(element);
  }
  return mapArea.appendChild(fragment);
};

/* ----- Передаю массив сгенерированных объектов в функцию отрисовки пинов */
drawPins(objectList);

/* ----- Функция для наполнения карточки объекта */
var generateCard = function (object) {
  var card = document.querySelector('#card').content.querySelector('article');

  card.querySelector('.popup__title').textContent = object.offer.title;
  card.querySelector('.popup__text--address').textContent = object.offer.address;
  card.querySelector('.popup__text--price').textContent = object.offer.price + '₽/ночь';

  /* ----- Мапа для типов */
  var objectTypes = {
    bungalo: 'Бунгало',
    flat: 'Квартира',
    house: 'Дом',
    palace: 'Дворец'
  };
  card.querySelector('.popup__type').textContent = objectTypes[object.offer.type];

  card.querySelector('.popup__text--capacity').textContent =
    object.offer.rooms + ' комнаты для ' + object.offer.guests + ' гостей';

  card.querySelector('.popup__text--time').textContent =
    'Заезд после ' + object.offer.checkin + ', выезд до ' + object.offer.checkout;

  /* ----- Удаляю список */
  card.querySelector('.popup__features').remove();

  /* ----- Создаю новый список */
  var newUl = document.createElement('ul');
  newUl.classList.add('popup__features');

  /* ----- Создаю строки в списке на основе массива фичей из первого объекта*/
  for (var k = 0; k < object.offer.features.length; k++) {
    var newLi = document.createElement('li');
    newLi.classList.add('popup__feature');
    newLi.classList.add('popup__feature--' + object.offer.features[k]);
    newUl.appendChild(newLi);
  }

  card.insertBefore(newUl, card.querySelector('.popup__description'));

  /* ----- Описание объекта */
  card.querySelector('.popup__description').textContent = object.offer.description;

  /* ----- Вывод фотографий */
  card.querySelector('.popup__photo').src = object.offer.photos[0];
  var photosCard = card.querySelector('.popup__photo');

  for (var p = 1; p < object.offer.photos.length; p++) {
    var dupPhotosCard = photosCard.cloneNode(true);
    dupPhotosCard.src = object.offer.photos[p];
    card.querySelector('.popup__photos').appendChild(dupPhotosCard);
  }

  /* ----- Возвращаю вывод на страницу */
  return map.insertBefore(card, map.querySelector('.map__filters-container'));
};

/* ----- Вызываю функцию отрисовки карточки первым элементом из массива */
generateCard(objectList[0]);
