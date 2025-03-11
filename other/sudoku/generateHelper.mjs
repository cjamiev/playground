import { modifierMap } from './constants.mjs';
import { getCloneGrid } from './util.mjs';
import { getUniqueNumbers } from './randomHelper.mjs';

// Create random 3x3 matrices for the diagonal sections of the grid
const getDiagonalNumbersInGrid = (newGrid) => {
  const constructedGrid = getCloneGrid(newGrid);
  for (let matrixIndex = 0; matrixIndex < 3; matrixIndex++) {
    const randomNumbers = getUniqueNumbers();
    const { rowIndexModifier, columnIndexModifier } = modifierMap[matrixIndex * 4];
    for (let count = 0; count < 9; count++) {
      const rowIndex = Math.floor(count / 3) + rowIndexModifier;
      const columnIndex = (count % 3) + columnIndexModifier;
      constructedGrid[rowIndex][columnIndex] = randomNumbers[count];
    }
  }

  return constructedGrid;
};

// When a new attempt is made reset the grid
const resetNotDiagonalGrid = (newGrid) => {
  for (let matrixIndex = 1; matrixIndex < 8; matrixIndex++) {
    if (matrixIndex === 4 || matrixIndex === 8) {
      continue;
    }
    const { rowIndexModifier, columnIndexModifier } = modifierMap[matrixIndex];
    for (let count = 0; count < 9; count++) {
      const rowIndex = Math.floor(count / 3) + rowIndexModifier;
      const columnIndex = (count % 3) + columnIndexModifier;
      newGrid[rowIndex][columnIndex] = 0;
    }
  }

  return getCloneGrid(newGrid);
};

// When a new attempt is made reset the uses except matrix 2
const resetIncrementGrid = (incrementGrid) => {
  for (let rowIndex = 2; rowIndex < 8; rowIndex++) {
    if (rowIndex === 4 || rowIndex === 8) {
      continue;
    }
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      incrementGrid[rowIndex][columnIndex] = 0;
    }
  }

  return incrementGrid;
};

export { getDiagonalNumbersInGrid, resetNotDiagonalGrid, resetIncrementGrid };