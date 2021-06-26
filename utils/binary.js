import { reverseString } from './stringHelper';

const ZERO = 0;
const ONE = 1;
const TWO = 2;
const ZERO_STR = '0';
const ONE_STR = '1';

const recursivelyConvertDecimalToBinary = decimalValue => {
  if (decimalValue === ONE) {
    return ONE_STR;
  } else if (decimalValue === ZERO) {
    return ZERO_STR;
  } else if (decimalValue % TWO === ZERO) {
    return ZERO_STR + recursivelyConvertDecimalToBinary(Math.floor(decimalValue / TWO));
  } else {
    return ONE_STR + recursivelyConvertDecimalToBinary(Math.floor(decimalValue / TWO));
  }
};

const convertDecimalToBinary = (decimalValue = ZERO) => {
  const negative = Number(decimalValue) < ZERO;
  const value = negative ? -Number(decimalValue) : Number(decimalValue);

  const reversedBinary = recursivelyConvertDecimalToBinary(value);
  const binaryResult = reverseString(reversedBinary);

  return negative ? `-${binaryResult}` : binaryResult;
};

export { convertDecimalToBinary };
