const sudokuNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// used to create 9 3x3 matrix across 9 arrays
const modifierMap = [
  { rowIndexModifier: 0, columnIndexModifier: 0 },
  { rowIndexModifier: 0, columnIndexModifier: 3 },
  { rowIndexModifier: 0, columnIndexModifier: 6 },
  { rowIndexModifier: 3, columnIndexModifier: 0 },
  { rowIndexModifier: 3, columnIndexModifier: 3 },
  { rowIndexModifier: 3, columnIndexModifier: 6 },
  { rowIndexModifier: 6, columnIndexModifier: 0 },
  { rowIndexModifier: 6, columnIndexModifier: 3 },
  { rowIndexModifier: 6, columnIndexModifier: 6 }
];
// Represent Sudoku Grid by splitting into rows
const initialGrid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]
];
// used to keep track of which possible numbers were already tested
const incrementGrid = [
  undefined,
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  undefined,
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  undefined
];

export { sudokuNumbers, modifierMap, initialGrid, incrementGrid };
