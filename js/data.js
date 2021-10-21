import { getRandomInt, getRandomElementOfArray } from './util.js';

const PHOTO_COUNT = 25;

const Likes = {
  MIN: 15,
  MAX: 200,
};

const Comments = {
  MIN: 1,
  MAX: 5,
};

const Avatar = {
  MIN: 1,
  MAX: 6,
};

const Id_comment = {
  MIN: 1,
  MAX: 2000,
};

const Sentence = {
  MIN: 1,
  MAX: 2,
};

const DESCRIPTIONS = [
  'Прекрасная погода',
  'Красивый закат',
  'Необычная осень',
  'Волшебная ночь',
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Валера',
  'Антон',
  'Лиза',
  'Вероника',
  'Алиса',
  'Сергей',
  'Ольга',
  'Владислав',
  'Полина',
  'Михаил',
  'Евгений',
];

const getComment = () => {
  return {
    id: getRandomInt(Id_comment.MIN, Id_comment.MAX),
    avatar: `img/avatar-${getRandomInt(Avatar.MIN, Avatar.MAX)}.svg`,
    message: new Array(getRandomInt(Sentence.MIN, Sentence.MAX))
      .fill(null)
      .map(() => getRandomElementOfArray(COMMENTS))
      .join(' '),
    name: getRandomElementOfArray(NAMES),
  };
};

const getComments = () =>
  new Array(getRandomInt(Comments.MIN, Comments.MAX))
    .fill(null)
    .map(() => getComment());

const getPhotos = (id) => {
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomElementOfArray(DESCRIPTIONS),
    likes: getRandomInt(Likes.MIN, Likes.MAX),
    comments: getComments(),
  };
};

const photos = new Array(PHOTO_COUNT)
  .fill(null)
  .map((arr, id) => getPhotos(id + 1));

export { photos };
