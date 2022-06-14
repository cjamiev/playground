import { flattenDeep } from './arrayHelper';
import { isObjectLike } from './type-check';

const cloneDeep = targetObject => {
  const entries = Object.keys(targetObject);

  return entries.reduce((accumulator, key) => {
    if(Array.isArray(targetObject[key]) && isObjectLike(targetObject[key][ZERO])) {
      return { ...accumulator, [key]: targetObject[key].map(item => cloneDeep(item)) };
    } else if(isObjectLike(targetObject[key])) {
      return { ...accumulator, [key]: cloneDeep(targetObject[key]) };
    } else {
      return { ...accumulator, [key]: targetObject[key] };
    }
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

const removeAttribute = (targetObject, keyName) => {
  const entries = Object.keys(targetObject).filter(key => key !== keyName);

  return entries.reduce((accumulator, key) => {
    if(Array.isArray(targetObject[key]) && isObjectLike(targetObject[key][ZERO])) {
      return { ...accumulator, [key]: targetObject[key].map(item => removeAttribute(item, keyName)) };
    } else if(isObjectLike(targetObject[key])) {
      return { ...accumulator, [key]: removeAttribute(targetObject[key], keyName) };
    } else {
      return { ...accumulator, [key]: targetObject[key] };
    }
  }, {});
};

const removeAttributes = (targetObject, keyNames) => {
  let currentObj = targetObject;
  keyNames.forEach(keyName => {
    currentObj = removeAttribute(currentObj, keyName);
  });

  return currentObj;
};

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
  removeAttributes,
  resolvePath,
  filterOutEmptyKeys
};
