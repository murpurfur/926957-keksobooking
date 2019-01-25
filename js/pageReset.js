'use strict';
(function () {
  var form = window.utils.notice.querySelector('.ad-form');

  // ----- Для очистки превью картинок
  var adImagePreview = document.querySelector('.ad-form__photo').children[0];
  var avararPreview = document.querySelector('.ad-form-header__preview').children[0];
  // ----- Функция перевода страницы в неактивное состояние
  var pageReset = function () {
    form.reset();
    // ----- Очистка превью картинок
    avararPreview.src = 'img/muffin-grey.svg';
    adImagePreview.src = '';
    adImagePreview.classList.add('visually-hidden');
    window.disablePageState();
  };
  window.pageReset = pageReset;
})();
