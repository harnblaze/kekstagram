const hashtags = document.querySelector('.text__hashtags');

const validateHashtag = (element, text) => {
  if (text[0] !== '#') {
    element.setCustomValidity('Хэштег должен начинаться с #');
  } else if (text.length > 20) {
    element.setCustomValidity(
      'максимальная длина одного хэш-тега 20 символов, включая решётку',
    );
  } else if (text.length < 2) {
    element.setCustomValidity(
      'хеш-тег не может состоять только из одной решётки',
    );
  } else if (!text.slice(1, text.length).match(/^[A-Za-z0-9]+$/g)) {
    element.setCustomValidity(
      'строка после решётки должна состоять из букв и чисел',
    );
  } else {
    element.setCustomValidity('');
  }
  element.reportValidity();
};

hashtags.addEventListener('input', (evt) => {
  const hashtagElement = evt.target;
  const textStr = evt.target.value.toLowerCase().trim();
  const hashtagArr = [];

  if (textStr.split('#').length < 2) {
    validateHashtag(hashtagElement, textStr);
  } else {
    if (textStr.split('#').length !== textStr.split(/\s+/).length + 1) {
      hashtagElement.setCustomValidity('хэш-теги разделяются пробелами');
    } else if (textStr.split(' ').length > 5) {
      hashtagElement.setCustomValidity(
        'нельзя указывать больше пяти хэш-тегов',
      );
    } else {
      textStr.split(' ').forEach((el) => {
        if (hashtagArr.includes(el)) {
          hashtagElement.setCustomValidity(
            'один и тот же хэш-тег не может быть использован дважды',
          );
        } else {
          hashtagArr.push(el);
          hashtagElement.setCustomValidity('');
        }
      });
    }
    hashtagElement.reportValidity();
  }
});
