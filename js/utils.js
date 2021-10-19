const getRandomInt = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (max < min) {
    [min, max] = [max, min];
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElementOfArray =  (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

const stringCount = (text, maxCount) => {
  return text.length <= maxCount;
};

export {getRandomInt, getRandomElementOfArray, stringCount};
