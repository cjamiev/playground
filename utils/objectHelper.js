import { flattenDeep } from './arrayHelper';
import { isObjectLike } from './type-check';

const cloneDeep = targetObject => {
  const entries = Object.keys(targetObject);

  return entries.reduce((accumulator, key) => {
    return isObjectLike(targetObject[key])
      ? { ...accumulator, [key]: cloneDeep(targetObject[key]) }
      : { ...accumulator, [key]: targetObject[key] };
  }, {});
};

const map = func => targetObject => {
  const keys = Object.keys(targetObject);
  const mappedObject = keys.reduce((accumulator, item) => {
    const mappedValue = func(targetObject[item]);

    return { ...accumulator, [item]: mappedValue };
  }, {});

  return mappedObject;
};

const removeProperty = prop => ({ [prop]: _, ...rest }) => rest;

const resolvePath = (obj = {}, path = '', separator = '.') => {
  const properties = path.split(separator);

  return properties.reduce((node, nextKey) => node && node[nextKey], obj);
};

const getObjectPath = (obj, parentKey = '') => {
  const entries = Object.keys(obj);

  const deepKeys = entries.reduce((accumulator, key) => {
    if (isObjectLike(obj[key])) {
      const concatKey = parentKey ? `${parentKey}.${key.toString()}` : key;
      const deepKey = getObjectPath(obj[key], concatKey);

      return [...accumulator, deepKey];
    } else {
      const concatKey = parentKey ? `${parentKey}.${key.toString()}` : key;

      return [...accumulator, concatKey];
    }
  }, []);

  return flattenDeep(deepKeys);
};

const filterOutEmptyKeys = (obj) => {
  const definedProperties = Object
    .keys(obj)
    .filter(key => {
      if(!obj[key]) {
        return false;
      }

      return true;
    })
    .reduce((accumulator, key) => {
      return { [key]: obj[key], ...accumulator };
    }, {});

  return definedProperties;
};

export {
  cloneDeep,
  getObjectPath,
  map,
  removeProperty,
  resolvePath,
  filterOutEmptyKeys
};
