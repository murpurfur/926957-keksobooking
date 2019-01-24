'use strict';
(function () {
  var form = window.utils.notice.querySelector('.ad-form');
  // ----- Функция перевода страницы в неактивное состояние
  var pageReset = function () {
    form.reset();
  };
  window.pageReset = pageReset;
})();
