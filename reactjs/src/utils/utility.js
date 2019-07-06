export const swapArrayElementPositions = (oldArray, indexA, indexB) => {
  if (indexA < 0 || indexB < 0 || indexA >= oldArray.length || indexB >= oldArray.length) {
    return oldArray;
  }

  const newArray = oldArray.slice();
  const tempItem = oldArray[indexA];
  newArray[indexA] = oldArray[indexB];
  newArray[indexB] = tempItem;

  return newArray;
};

export const decrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index - 1);
};

export const incrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index + 1);
};

export const isObjectLike = (value) => (value !== null && typeof value === 'object');

export const isNotEmpty = (targetObject) => {
  if (!targetObject || Object.keys(targetObject).length === 0) {
    return false;
  }

  const entries = Object.keys(targetObject);
  const atLeastOneNotNull = entries.some(key => targetObject[key]);

  return atLeastOneNotNull;
};

export const isEmpty = (targetObject) => {
  return !isNotEmpty(targetObject);
};

export const cloneDeep = (targetObject) => {
  const entries = Object.keys(targetObject);
  const clone = entries
    .reduce((accumulator, key) => {
      if (targetObject[key] !== null && typeof (targetObject[key]) === 'object') {
        return { ...accumulator, [key]: cloneDeep(targetObject[key]) };
      } else {
        return { ...accumulator, [key]: targetObject[key] };
      }
    }, {});

  return clone;
};

export const isEqual = (object1, object2) => {
  const entries1 = Object.keys(object1);
  const isObject1Empty = isEmpty(object1);
  const isObject2Empty = isEmpty(object2);

  if (isObject1Empty !== isObject2Empty) {
    return false;
  }

  const checkEquality = entries1
    .reduce((accumulator, key) => {
      if (isObjectLike(object1[key]) && isObjectLike(object2[key])) {
        const equality = isEqual(object1[key], object2[key]);

        return accumulator && equality;
      } else {
        return accumulator && object1[key] === object2[key];
      }
    }, true);

  return checkEquality;
};