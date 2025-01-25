/* eslint-disable max-depth */
/* eslint-disable complexity */
const { initialGrid, incrementGrid, modifierMap } = require('./constants');
const { getDiagonalNumbersInGrid, resetNotDiagonalGrid, resetIncrementGrid } = require('./generateHelper');
const { printGrid } = require('./printHelper');
const {
  getPossibleGrid,
  getGoodNumbers
} = require('./gridHelper');
const {
  getCloneGrid,
  addNumbersInGrid,
  hasValidMatrix
} = require('./util');

const getRemainingNumbersInGrid = (grid, trackingGrid) => {
  let newGrid = getCloneGrid(grid);
  let newIncrementGrid = getCloneGrid(trackingGrid);
  let matrixIndex = 0;
  let attemptNumber = 0;
  while (matrixIndex < 8 && attemptNumber < 20000) {
    if (matrixIndex === 0 || matrixIndex === 4) {
      matrixIndex++;
    } else {
      const { rowIndexModifier, columnIndexModifier } = modifierMap[matrixIndex];
      const possibleGrid = getPossibleGrid(newGrid, rowIndexModifier, columnIndexModifier);
      const isValid = hasValidMatrix(possibleGrid);
      if (!isValid) {
        matrixIndex = 1;
        newGrid = resetNotDiagonalGrid(grid);
        newIncrementGrid = resetIncrementGrid(newIncrementGrid);
        attemptNumber++;
      } else {
        const { goodNumbers, isExhausted, updatedIncrementGrid } = getGoodNumbers(possibleGrid, newIncrementGrid[matrixIndex]);
        newIncrementGrid[matrixIndex] = updatedIncrementGrid;
        if (isExhausted) {
          matrixIndex = 1;
          newGrid = resetNotDiagonalGrid(grid);
          newIncrementGrid = resetIncrementGrid(newIncrementGrid);
          attemptNumber++;
        } else {
          newGrid = addNumbersInGrid(newGrid, goodNumbers, rowIndexModifier, columnIndexModifier);
          matrixIndex++;
        }
      }
    }
  }

  return newGrid;
};

const createSudoku = () => {
  const newGrid = getDiagonalNumbersInGrid(initialGrid);
  return getRemainingNumbersInGrid(newGrid, incrementGrid);
};

const result = createSudoku();
printGrid(result);
