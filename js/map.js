var randomValue = function(start, end) {
  Math.floor(Math.random() * end + start)
}

var titlesList = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
]

/*
функция которая возвращает рандомную строку из массива 

выбрать рандомный элемент массива
вывести в строку
удалить из массива
повторить 
  пока количество элементов больше 0
*/

var typesList = ['palace', 'flat', 'house', 'bungalo']

var checkInOutTime = ['12:00', '13:00', '14:00']

var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']

// var generatePhotosList = function() {
//   var photosList = [];
//   for (var i = 0; i < 3; i++) {
//     photosList[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i + 1) + '.jpg'
//   }
// }

var photosList = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
]

var author = {
  avatar: 'img/avatars/user' + '0' + randomValue(1, 8) + '.png'
}

var offer = {
  title: 'строка, заголовок предложения, одно из фиксированных значений "Большая уютная квартира"',
  // "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик",
  // "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде".
  // Значения не должны повторяться.
  address: 'строка, адрес предложения, представляет собой запись вида "{{location.x}}, {{location.y}}"',
  //например, "600, 350"
  price: randomValue(1000, 1000000),
  type: typesList[randomValue(0, typesList.length - 1)],
  rooms: randomValue(1, 5),
  guests: randomValue(1, 8),
  checkin: checkInOutTime[randomValue(0, 3)],
  checkout: checkInOutTime[randomValue(0, 3)],
  features: featuresList.splice(0, randomValue(0, featuresList.lenght)),
  description: '',
  photos: []
  //массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg"
  //и "http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке
}

var location = {
  x: '',
  //случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
  y: randomValue(130, 630)
  //случайное число, координата y метки на карте от 130 до 630.
}
