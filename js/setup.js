'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  function randomAttribute(array) {  // функция выбора случайного элемента массива
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
  }

  function createWizardsArray(length) {  // функция создания массива JS-объектов
    var array = [];
    for (var i = 0; i < length; i++) {
      var randomWizard = {
        name: randomAttribute(WIZARD_NAMES) + ' ' + randomAttribute(WIZARD_SURNAMES),
        coatColor: randomAttribute(COAT_COLORS),
        eyesColor: randomAttribute(EYES_COLORS)
      };
      array.push(randomWizard);
    }
    return array;
  }

  function createWizard(wizard) {  // функция создания DOM-элемента на основе шаблона и JS-объекта

    var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  }

  function fillFragment(wizardsArray) {  // функция заполнения блока DOM-элементами на основе массива JS-объектов
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < wizardsArray.length; i++) {
      fragment.appendChild(createWizard(wizardsArray[i]));
    }
    return fragment;
  }

  var setup = document.querySelector('.setup');

  var similarListElement = document.querySelector('.setup-similar-list');
  var wizards = createWizardsArray(4);

  similarListElement.appendChild(fillFragment(wizards));
  setup.querySelector('.setup-similar').classList.remove('hidden');

  var shopElement = setup.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = setup.querySelector('.setup-artifacts');

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    artifactsElement.querySelectorAll('.setup-artifacts-cell').style.outline = '2px dashed red';
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();

    artifactsElement.querySelectorAll('.setup-artifacts-cell').style.outline = '';
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });

  window.setup = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],

    randomAttribute: function (array) {  // функция выбора случайного элемента массива
      var rand = Math.floor(Math.random() * array.length);
      return array[rand];
    }
  };
})();
