const ZERO = 0;
const ONE = 1;
const TWO = 2;

const convertDecimalToTruthArray = decimalValue => {
  if (Number(decimalValue) === ONE) {
    return [true];
  } else if (Number(decimalValue) === ZERO) {
    return [false];
  } else if (decimalValue % TWO === ZERO) {
    return [false].concat(convertDecimalToTruthArray(Math.floor(Number(decimalValue) / TWO)));
  } else {
    return [true].concat(convertDecimalToTruthArray(Math.floor(Number(decimalValue) / TWO)));
  }
};

const truthPermutator = (truthKeys = []) => {
  const size = Math.pow(TWO, truthKeys.length);

  const result = Array.from({ length: size }, (x, i) => {
    const truthArray = convertDecimalToTruthArray(i);
    return truthKeys
      .map((key, index) => ({ [key]: truthArray[index] || false }))
      .reduce((accumulator, item) => {
        return { ...accumulator, ...item };
      }, {});
  });

  return result;
};

module.exports = {
  truthPermutator
};
