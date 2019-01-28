'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var UPLOADED_IMAGES_LIMIT = 8;

  // ----- Добавление аватарки
  var avatarChooser = document.querySelector('.ad-form-header__input');
  var avararPreview = document.querySelector('.ad-form-header__preview').children[0];

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avararPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
  // ----- Добавление картинки объявления
  var adImageChooser = document.querySelector('.ad-form__input');
  var adImageDiv = document.querySelector('.ad-form__upload');
  var adImagePreview = document.querySelector('.ad-form__photo');
  var imageContainer = document.querySelector('.ad-form__photo-container');
  var imageCount = 0;

  adImageChooser.addEventListener('change', function () {
    var file = adImageChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        adImagePreview.children[0].classList.remove('visually-hidden');
        adImagePreview.children[0].src = reader.result;
      });

      reader.readAsDataURL(file);
      imageCount = imageCount + 1;

      if (imageCount < UPLOADED_IMAGES_LIMIT) {
        var dupImagePreview = adImagePreview.cloneNode(true);
        var dupImageDiv = adImageDiv.cloneNode(true);
        dupImageDiv.classList.add('visually-hidden');
        imageContainer.insertBefore(dupImagePreview, adImagePreview.nextSibling);
        imageContainer.insertBefore(dupImageDiv, adImagePreview.nextSibling);
        adImageChooser.removeEventListener('change');

      } else if (imageCount === UPLOADED_IMAGES_LIMIT) {
        dupImagePreview = adImagePreview.cloneNode(true);
        imageContainer.insertBefore(dupImagePreview, adImagePreview.nextSibling);
        imageContainer.children[UPLOADED_IMAGES_LIMIT + 1].remove();
      }
    }
  });
})();
