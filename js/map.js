var randomValue = function(start, end) {
  return Math.floor(Math.random() * end + start)
}

var test = randomValue(1, 4)

var typesList = ['palace', 'flat', 'house', 'bungalo']

var checkInOutTime = ['12:00', '13:00', '14:00']

var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
var featuresListRandom = randomValue(1, featuresList.length)

var photosList = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
]

var shuffleArray = function(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}

var author = {
  avatar: 'img/avatars/user' + '0' + randomValue(1, 8) + '.png'
}

var map = document.querySelector('.map')

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

var objectArray = []

for (var i = 0; i < 8; i++) {
  var randomStringNumber = randomValue(0, titlesList.length)

  objectArray.push({
    title: titlesList[randomStringNumber],
    address: randomValue(1, map.scrollWidth) + ', ' + randomValue(130, 630),
    price: randomValue(1000, 1000000),
    type: typesList[randomValue(0, typesList.length - 1)],
    rooms: randomValue(1, 5),
    guests: randomValue(1, 8),
    checkin: checkInOutTime[randomValue(0, 3)],
    checkout: checkInOutTime[randomValue(0, 3)],
    features: featuresList.splice(0, featuresListRandom),
    description: '',
    photos: shuffleArray(photosList)
  })
  titlesList.splice(randomStringNumber, 1)
}

console.log(objectArray)
