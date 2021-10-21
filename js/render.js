import { photos } from './data.js';

const picturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPicture =  ({url, likes, comments}) => {
  const picture = pictureTemplate.cloneNode(true);
  const pictureImg = picture.querySelector('.picture__img');
  pictureImg.src = url;
  const pictureLikes = picture.querySelector('.picture__likes');
  pictureLikes.textContent = likes;
  const pictureComment = picture.querySelector('.picture__comments');
  pictureComment.textContent = comments.length;
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
