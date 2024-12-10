const { sudokuNumbers } = require('./constants');


const areArraysEqual = (ary1, ary2) => {
  return ary1.every((item, index) => item === ary2[index]);
};

const getCloneGrid = (grid) => {
  return grid.map((i) => (i !== undefined ? [...i] : undefined));
};

const addNumbersInGrid = (grid, goodNumbers, rowIndexModifier, columnIndexModifier) => {
  const newGrid = getCloneGrid(grid);
  for (let count = 0; count < 9; count++) {
    const rowIndex = Math.floor(count / 3) + rowIndexModifier;
    const columnIndex = (count % 3) + columnIndexModifier;
    newGrid[rowIndex][columnIndex] = goodNumbers[count];
  }

  return newGrid;
};

const hasValidMatrix = (possibleGrid) => {
  const hasEmptyCell = possibleGrid.some((row) => row.length === 0);
  if (hasEmptyCell) {
    return false;
  }

  const allNumbers = possibleGrid.reduce((accumulator, current) => {
    return [...accumulator, ...current];
  }, []);

  const hasAllDigits = sudokuNumbers.filter((num) => allNumbers.some((i) => i === num)).length === 9;

  return hasAllDigits;
};

const getMaxRun = (possibleGrid, usedMatrix) => {
  const absoluteMax = possibleGrid.reduce((accumulator, current) => accumulator * current.length, 1);
  let indexOfHighestNonzero = 0;
  usedMatrix.forEach((current, index) => {
    if (current && index > indexOfHighestNonzero) {
      indexOfHighestNonzero = index;
    }
  });
  const currentRun = usedMatrix.reduce((accumulator, current, index) => {
    if (index < indexOfHighestNonzero) {
      return accumulator * possibleGrid[index].length;
    } else if (index === indexOfHighestNonzero) {
      return accumulator * current;
    } else {
      return accumulator;
    }
  }, 1);

  return absoluteMax - currentRun;
};

module.exports = { areArraysEqual, getCloneGrid, hasValidMatrix, addNumbersInGrid, getMaxRun };
