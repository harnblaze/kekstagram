import { photos } from './data.js';
import { onPictureClick } from './full-picture.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture =  (photoData) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  pictureImg.src = photoData.url;
  const pictureLikes = picture.querySelector('.picture__likes');
  pictureLikes.textContent = photoData.likes;
  const pictureComment = picture.querySelector('.picture__comments');
  pictureComment.textContent = photoData.comments.length;
  picture.addEventListener('click', () => onPictureClick(photoData))
  return picture;
}


const renderPictures = () => {
  const picturesFragment = document.createDocumentFragment();

  photos.forEach((el, i)=>{
    picturesFragment.appendChild(renderPicture(photos[i]));
  });

  picturesList.append(picturesFragment);
}


export {renderPictures}
