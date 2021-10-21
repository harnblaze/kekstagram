const bigPicture =  document.querySelector('.big-picture');
const bigPictureComments = bigPicture.querySelector('.social__comments');

const getComment = ({avatar, name, message}) => {
  return (`<li class="social__comment">
              <img class="social__picture" src="${avatar}" alt="${name})" width="35"
                height="35">
              <p class="social__text">${message}</p>
            </li>`)
}

const renderComments  = (dataComments) => {
  dataComments.forEach((el,i)=> {
    bigPictureComments.insertAdjacentHTML('afterbegin', getComment(dataComments[i]))
  })
}
const onCloseButtonClick = () => {
  bigPicture.classList.add('hidden');
}

const onPictureClick = (photoData) => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  const bigPictureSocialCommentsCount = bigPicture.querySelector('.social__comment-count');
  bigPictureSocialCommentsCount.classList.add('hidden')
  const bigPictureSocialCommentsLoader = bigPicture.querySelector('.comments-loader');
  bigPictureSocialCommentsLoader.classList.add('hidden')

  const bigPictureTitle = bigPicture.querySelector('.social__caption')
  bigPictureTitle.textContent = photoData.description;
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  bigPictureImg.src = photoData.url;
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  bigPictureLikes.textContent = photoData.likes;
  const bigPictureCommentsCount = bigPicture.querySelector('.comments-count');
  bigPictureCommentsCount.textContent = photoData.comments.length;

  bigPictureComments.innerHTML = '';
  renderComments(photoData.comments);
  const bigPictureCloseButton = document.querySelector('.big-picture__cancel')
  bigPictureCloseButton.addEventListener('click', () => {
    onCloseButtonClick();
  })
  document.addEventListener('keydown', (evt) => {

    if (evt.code ==='Escape') {
      onCloseButtonClick();
    }
  })
}

export {onPictureClick}

