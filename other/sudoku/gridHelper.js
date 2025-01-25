const { sudokuNumbers } = require('./constants');
const { getCloneGrid, getMaxRun } = require('./util');

// convert rows to columns
const getColumn = (grid, verticalIndex) => {
  return grid.map((row) => row[verticalIndex]);
};

// get valid numbers for a cell by mnerging current column and row
const getValidNumbers = (column, row) => {
  const invalidNumbers = column.concat(row);
  return sudokuNumbers.filter((possibleNumber) => !invalidNumbers.some((num) => num === possibleNumber));
};

// Each row of the grid represents possible values for cell of a given matrix
const getPossibleGrid = (gridWithDiagonals, rowIndexModifier, columnIndexModifier) => {
  const possibleGrid = [];
  for (let count = 0; count < 9; count++) {
    const rowIndex = Math.floor(count / 3) + rowIndexModifier;
    const columnIndex = (count % 3) + columnIndexModifier;
    const row = gridWithDiagonals[rowIndex];
    const column = getColumn(gridWithDiagonals, columnIndex);
    const validNumbers = getValidNumbers(column, row);
    possibleGrid.push(validNumbers);
  }

  return possibleGrid;
};

const checkIfExhausedPossibilities = (possibleGrid, usedMatrix) => {
  // usedMatrixIndex hit the maximum number
  if (possibleGrid[8].length === usedMatrix[8]) {
    return true;
  } else {
    return false;
  }
};

const incrementUsedIndex = (possibleGrid, usedMatrix) => {
  let wasIncremented = false;
  let shouldFlipToZeroIndex = 0;
  const updatedUsedMatrix = usedMatrix
    .map((count, index) => {
      // Only increment once
      if (wasIncremented) {
        return count;
      } else {
        const currentMax = possibleGrid[index].length - 1;
        if (count < currentMax) {
          wasIncremented = true;
          shouldFlipToZeroIndex = index;
          return count + 1;
        } else {
          return count;
        }
      }
    })
    .map((count, index) => {
      if (index < shouldFlipToZeroIndex) {
        return 0;
      } else {
        return count;
      }
    });

  return updatedUsedMatrix;
};

const getGoodNumbers = (possibleGrid, usedMatrix) => {
  let breakInteger = 0;
  const max = getMaxRun(possibleGrid, usedMatrix);
  let incrementGrid = usedMatrix.map(i => i);
  while (true) {
    breakInteger++;
    const goodNumbers = [];
    let isBadRun = false;
    let isGoodRun = false;
    possibleGrid.forEach((entry, index) => {
      if (!isBadRun && !isGoodRun) {
        const numberIndex = incrementGrid[index];
        const newNum = entry[numberIndex];
        const isNotValidNumber = goodNumbers.some((i) => i === newNum);

        if (goodNumbers.length === 9) {
          isGoodRun = true;
        } else if (isNotValidNumber) {
          isBadRun = true;
          incrementGrid = incrementUsedIndex(possibleGrid, incrementGrid);
        } else {
          goodNumbers.push(newNum);
        }
      }
    });
    if (goodNumbers.length === 9) {
      incrementGrid = incrementUsedIndex(possibleGrid, incrementGrid);
      return { goodNumbers, updatedIncrementGrid: incrementGrid, isExhausted: false };
    }
    if (checkIfExhausedPossibilities(possibleGrid, incrementGrid) || breakInteger > max) {
      return { goodNumbers: [0, 0, 0, 0, 0, 0, 0, 0, 0], updatedIncrementGrid: incrementGrid, isExhausted: true };
    }
  }
};

module.exports = { getPossibleGrid, getGoodNumbers };
