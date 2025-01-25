const THIRTY_SIX = 36;
const FIFTY = 50;
const HUNDRED = 100;

const randomNumber = (length = HUNDRED) => Math.round(Math.random()*length);
const randomString = () => Math.random().toString(THIRTY_SIX).replace(/[^a-z]+/g, '');
const randomBoolean = () => Math.round(Math.random()*HUNDRED) > FIFTY;
const randomObject = (item) => {
  const keys = Object.keys(item);
  return keys.map(key => {
    const value = item[key];
    const type = typeof item[key];

    if(type === 'number') {
      return { [key]: randomNumber()};
    }
    else if (type === 'boolean') {
      return { [key]:randomBoolean()};
    } else if (type === 'string') {
      return { [key]:randomString()};
    } else if (Array.isArray(item[key])) {
      return { [key]:Object.values(randomObject(item[key]))};
    } else if (type === 'object' && value) {
      return { [key]:randomObject(item[key])};
    } else {
      return { [key]:undefined};
    }
  }).reduce((acc,entry) => {
    return {...acc, ...entry};
  }, {});
};

const dataGenerator = (item, size) => {
  return Array.from({ length: size }, (x, i) => {
    return randomObject(item);
  });
};

export {
  randomBoolean,
  randomNumber,
  randomString,
  randomObject,
  dataGenerator
};