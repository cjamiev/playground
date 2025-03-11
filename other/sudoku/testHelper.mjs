import { resetNotDiagonalGrid } from './generateHelper.mjs';
import { printGrid } from './printHelper.mjs';

const gridWithDiagonal = [
  [4, 8, 7, 0, 0, 0, 0, 0, 0],
  [2, 3, 9, 0, 0, 0, 0, 0, 0],
  [1, 5, 6, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 9, 3, 7, 0, 0, 0],
  [0, 0, 0, 4, 8, 1, 0, 0, 0],
  [0, 0, 0, 5, 6, 2, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 5, 8, 6],
  [0, 0, 0, 0, 0, 0, 2, 1, 4],
  [0, 0, 0, 0, 0, 0, 3, 7, 9]
];

export { gridWithDiagonal };
