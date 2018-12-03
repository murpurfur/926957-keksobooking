/* eslint-disable strict */
'use strict';

var map = document.querySelector('.map');
var mapArea = document.querySelector('.map__pins');

map.classList.remove('map--faded');

/* ----- Определяю вспомогательные переменные для генерации объектов */
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

var shuffleArray = function (array) {
  var currentIndex = array.length;
  var temporaryValue;
  var randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

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
var objectArray = [];

for (var i = 0; i < 8; i++) {
  var randomIndex = getRandomValue(0, avatarNumbers.length - 1);
  var randomStringNumber = getRandomValue(0, titlesList.length);
  var locationX = getRandomValue(1, mapArea.scrollWidth);
  var locationY = getRandomValue(130, 630);
  var featuresListRandom = getRandomValue(0, featuresList.length - 1);

  objectArray.push({
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
      photos: shuffleArray(photosList)
    },
    location: {
      x: locationX,
      y: locationY
    }
  });
  avatarNumbers.splice(randomIndex, 1);
}

/* ----- Вывожу пины на карту */
var templatePin = document.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();

for (var pinCount = 0; pinCount < objectArray.length; pinCount++) {
  var element = templatePin.cloneNode(true);
  element.style.left = objectArray[pinCount].location.x + 50 * 0.5 + 'px';
  element.style.top = objectArray[pinCount].location.y + 70 + 'px';
  // console.log(document.querySelector('button[type="button"]'));
  // console.log(document.querySelector('button[type="button"]'.clientHeight));
  element.children[0].src = objectArray[pinCount].author.avatar;
  element.children[0].alt = objectArray[pinCount].offer.title;
  fragment.appendChild(element);
}
mapArea.appendChild(fragment);

/* ----- Наполняю карточку данными сгенерированного объекта */
var card = document.querySelector('#card').content.querySelector('article');

card.querySelector('.popup__title').textContent = objectArray[0].offer.title;
card.querySelector('.popup__text--address').textContent = objectArray[0].offer.address;
card.querySelector('.popup__text--price').textContent = objectArray[0].offer.price + '₽/ночь';

if (objectArray[0].offer.type === 'bungalo') {
  card.querySelector('.popup__type').textContent = 'Бунгало';
}
if (objectArray[0].offer.type === 'flat') {
  card.querySelector('.popup__type').textContent = 'Квартира';
}
if (objectArray[0].offer.type === 'house') {
  card.querySelector('.popup__type').textContent = 'Дом';
}
if (objectArray[0].offer.type === 'palace') {
  card.querySelector('.popup__type').textContent = 'Дворец';
}

card.querySelector('.popup__text--capacity').textContent =
  objectArray[0].offer.rooms + ' комнаты для' + objectArray[0].offer.guests + ' гостей';

card.querySelector('.popup__text--time').textContent =
  'Заезд после ' + objectArray[0].offer.checkin + ', выезд до ' + objectArray[0].offer.checkout;

card.querySelectorAll('.popup__feature').remove();

var featureAllLi = card.querySelector('.popup__features');

for (var k = featureAllLi.length; k >= 0; k--) {
  card.querySelector('.popup__features').children[k].remove();
}

console.log(card.querySelector('.popup__features').children);
/* cicle dlya proverki imen */
// for (var featureIndex = 0; featureIndex < objectArray[0].offer.features.length; featureIndex++) {
//   // if (objectArray[0].offer.feature[featureIndex] ===
//   console.log(card.querySelector('.popup__features').children[featureIndex]);
//   console.log(card.querySelector('.popup__features').children[featureIndex].classList[1]);
//   console.log(objectArray[0].offer.features[featureIndex]);
//   if (
//     card.querySelector('.popup__features').children[featureIndex].classList[1] ==
//     'popup__feature--' + objectArray[0].offer.features[featureIndex]
//   ) {
//     card.querySelector('.popup__features').children[featureIndex].remove();
//   }
// }

card.querySelector('.popup__description').textContent = objectArray[0].offer.description;
console.log(objectArray[0].offer.photos[0]);
card.querySelector('.popup__photos').src = objectArray[0].offer.photos[0];
console.log(card.querySelector('.popup__photos').src);

/* И вывод фотографий странным образом не работает */

card.querySelector('img').src = objectArray[0].author.avatar;

/* ----- Вывожу карточку на страницу */
map.insertBefore(card, map.querySelector('.map__filters-container'));
