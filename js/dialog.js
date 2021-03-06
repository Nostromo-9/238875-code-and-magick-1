'use strict';

(function () {
  // функция открытия окна персонажа с обработчиком нажатия 'Esc'
  function openPopup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  }

  // функция закрытия окна персонажа с удалением обработчика нажатия 'Esc' и обновлением начальных координат окна диалога
  function closePopup() {
    setup.classList.add('hidden');

    setup.style.top = 100 + 'px';
    setup.style.left = 50 + '%';

    document.removeEventListener('keydown', onPopupEscPress);
  }

  // функция обработки нажатия 'Esc' при открытом окне персонажа
  function onPopupEscPress(evt) {
    window.util.isEscEvent(evt, closePopup);
  }

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupSubmit = setup.querySelector('.setup-submit');

  var wizardName = setup.querySelector('.setup-user-name');
  var dialogHandle = setup.querySelector('.setup-user-pic');

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  setupSubmit.addEventListener('click', function () {
    closePopup();
  });

  setupSubmit.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closePopup);
  });

  // если фокус находится на форме ввода имени, то 'Esc' не закрывает диалог
  wizardName.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, evt.stopPropagation());
  });

  // обработчик перетаскивания окна диалога
  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {  // функция обработки движения мыши
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {  // фукция обработки отпускания кнопки мыши
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
