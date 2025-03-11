/* eslint-disable max-depth */
/* eslint-disable complexity */
import { initialGrid, incrementGrid, modifierMap } from './constants.mjs';
import { getDiagonalNumbersInGrid, resetNotDiagonalGrid, resetIncrementGrid } from './generateHelper.mjs';
import { printGrid } from './printHelper.mjs';
import {
  getPossibleGrid,
  getGoodNumbers
} from './gridHelper.mjs';
import {
  getCloneGrid,
  addNumbersInGrid,
  hasValidMatrix
} from './util.mjs';

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
