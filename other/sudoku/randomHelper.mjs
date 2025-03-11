import { sudokuNumbers } from './constants.mjs';

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

export const getUniqueNumbers = () => {
  const generatedNumbers = [];
  const remainingNumbers = [...sudokuNumbers];

  for (let count = 0; count < sudokuNumbers.length; count++) {
    const nextDigitIndex = getRandomInt(remainingNumbers.length);
    const nextDigit = remainingNumbers[nextDigitIndex];

    remainingNumbers.splice(nextDigitIndex, 1);
    generatedNumbers.push(nextDigit);
  }

  return generatedNumbers;
};
