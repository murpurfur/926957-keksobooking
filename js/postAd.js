'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.send = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError('Ошибка отправки данных. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел отправиться за ' + xhr.timeout / 1000 + 'с');
    });
    xhr.timeout = 10000;
    xhr.open('POST', URL, true);
    xhr.send(data);
  };
})();


