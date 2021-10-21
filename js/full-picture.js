const bigPicture = document.querySelector('.big-picture');
const bigPictureComments = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = document.querySelector('.big-picture__cancel');

const getComment = ({ avatar, name, message }) => {
  return `<li class="social__comment">
              <img class="social__picture" src="${avatar}" alt="${name})" width="35"
                height="35">
              <p class="social__text">${message}</p>
            </li>`;
};

const renderComments = (dataComments) => {
  dataComments.forEach((el, i) => {
    bigPictureComments.insertAdjacentHTML(
      'afterbegin',
      getComment(dataComments[i]),
    );
  });
};

const onCloseButtonClick = () => {
  bigPicture.classList.add('hidden');
  bigPicture.removeEventListener('click', onCloseButtonClick);
  document.body.classList.remove('modal-open');
};

document.addEventListener('keydown', (evt) => {
  if (evt.code === 'Escape') {
    onCloseButtonClick();
  }
});

const onPictureClick = (photoData) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.querySelector('.social__caption').textContent =
    photoData.description;
  bigPicture.querySelector('.big-picture__img img').src = photoData.url;
  bigPicture.querySelector('.likes-count').textContent = photoData.likes;
  bigPicture.querySelector('.comments-count').textContent =
    photoData.comments.length;
  bigPictureComments.innerHTML = '';
  renderComments(photoData.comments);
  bigPictureCloseButton.addEventListener('click', onCloseButtonClick);
};

export { onPictureClick };
