import { isEmpty, xOr } from './booleanHelper';
import { isObjectLike } from './type-check';

const isEqual = (entry1, entry2) => {
  if (!(isObjectLike(entry1) && isObjectLike(entry1))) {
    return entry1 === entry2;
  }
  if (xOr(isEmpty(entry1), isEmpty(entry2))) {
    return false;
  }

  const keys1 = Object.keys(entry1);
  const keys2 = Object.keys(entry2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  const checkEquality = keys1.reduce((accumulator, key) => {
    const child1 = entry1[key];
    const child2 = entry2[key];

    return isObjectLike(child1) && isObjectLike(child2)
      ? accumulator && isEqual(child1, child2)
      : accumulator && child1 === child2;
  }, true);

  return checkEquality;
};

module.exports = {
  isEqual
};
