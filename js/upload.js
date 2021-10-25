/* global noUiSlider:readonly */
const upload = document.querySelector('#upload-file');
const uploadPopup = document.querySelector('.img-upload__overlay');
const uploadPopupCloseButton = uploadPopup.querySelector('#upload-cancel');
const scaleControl = uploadPopup.querySelector('.scale');
const scaleControlValue = uploadPopup.querySelector('.scale__control--value');
const uploadPreview = uploadPopup.querySelector('.img-upload__preview');
const effects = uploadPopup.querySelector('.effects');
const effectNone = effects.querySelector('#effect-none');
const sliderElement = uploadPopup.querySelector('.effect-level__slider');
const effectLevelValue = uploadPopup.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
});

const onCloseButtonUploadClick = () => {
  uploadPopup.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadPopupCloseButton.removeEventListener('click', onCloseButtonUploadClick);
  document.removeEventListener('keydown', onEscKeydownCloseUpload);
  scaleControl.removeEventListener('click', onScaleControlClick);
  upload.value = null;
  uploadPreview.style.filter = 'none';
};

const onEscKeydownCloseUpload = (evt) => {
  if (evt.code === 'Escape') {
    onCloseButtonUploadClick();
  }
};

const changeScalePreview = (value) => {
  scaleControlValue.value = value + '%';
  uploadPreview.style.transform = `scale(${value / 100})`;
};

const onScaleControlClick = (evt) => {
  let scaleValue = parseInt(scaleControlValue.value);
  if (evt.target.classList.contains('scale__control--smaller')) {
    scaleValue -= 25;
    scaleValue = scaleValue > 25 ? scaleValue : 25;
  } else if (evt.target.classList.contains('scale__control--bigger')) {
    scaleValue += 25;
    scaleValue = scaleValue < 100 ? scaleValue : 100;
  }

  changeScalePreview(scaleValue);
};

const onEffectChange = (evt) => {
  uploadPreview.classList.remove(`effects__preview--${effect}`);
  let effect = evt.target.value;
  let min = 0;
  let max = 1;
  let step = 0.1;
  switch (effect) {
    case 'chrome':
    case 'sepia':
      min = 0;
      max = 1;
      step = 0.1;
      break;
    case 'marvin':
      min = 0;
      max = 100;
      step = 1;
      break;
    case 'phobos':
    case 'heat':
      min = 0;
      max = 3;
      step = 0.1;
      break;
  }

  uploadPreview.style.filter = 'none';
  effectLevelValue.value = max;
  sliderElement.parentElement.style.display = 'block';
  uploadPreview.classList.add(`effects__preview--${effect}`);

  if (effect === 'none') {
    sliderElement.parentElement.style.display = 'none';
    effectLevelValue.value = 0;
    return;
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    start: max,
    step,
  });

  sliderElement.noUiSlider.on('update', (value, handle) => {
    effectLevelValue.value = value[handle];
    switch (effect) {
      case 'chrome':
        uploadPreview.style.filter = `grayscale(${value[handle]})`;
        break;
      case 'sepia':
        uploadPreview.style.filter = `sepia(${value[handle]})`;
        break;
      case 'marvin':
        uploadPreview.style.filter = `invert(${value[handle]}%)`;
        break;
      case 'phobos':
        uploadPreview.style.filter = `blur(${value[handle]}px`;
        break;
      case 'heat':
        uploadPreview.style.filter = `brightness(${value[handle]})`;
        break;
    }
  });
};

upload.addEventListener('change', () => {
  changeScalePreview(100);
  effectLevelValue.value = 100;
  effectNone.checked = true;
  sliderElement.parentElement.style.display = 'none';
  uploadPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadPopupCloseButton.addEventListener('click', onCloseButtonUploadClick);
  document.addEventListener('keydown', onEscKeydownCloseUpload);
  scaleControl.addEventListener('click', onScaleControlClick);
  effects.addEventListener('change', onEffectChange);
});
