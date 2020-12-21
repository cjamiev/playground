const ZERO = 0;
const ONE = 1;

export const swapArrayElementPositions = (oldArray, indexA, indexB) => {
  if (indexA < ZERO || indexB < ZERO || indexA >= oldArray.length || indexB >= oldArray.length) {
    return oldArray;
  }

  const newArray = oldArray.slice();
  const tempItem = oldArray[indexA];
  newArray[indexA] = oldArray[indexB];
  newArray[indexB] = tempItem;

  return newArray;
};

export const decrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index - ONE);
};

export const incrementElementIndex = (originalArray, index) => {
  return swapArrayElementPositions(originalArray, index, index + ONE);
};