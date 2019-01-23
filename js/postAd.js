'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.send = function (data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL, true);
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send(data);
  };
})();


