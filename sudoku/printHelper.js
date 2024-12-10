const printGrid = (grid) => {
  grid.forEach((row) => {
    console.log(row.join('|'));
  });
};

const printGridAsData = (grid) => {
  const rows = grid.map((row) => {
    return `[${row.join(',')}]`;
  });

  const asCode = `[${rows.join(',\n')}]`;

  console.log(asCode);
};

const traverseGrid = () => {
  for (let matrixIndex = 0; matrixIndex < 9; matrixIndex++) {
    const { rowIndexModifier, columnIndexModifier } = modifierMap[matrixIndex];
    for (let count = 0; count < 9; count++) {
      const rowIndex = Math.floor(count / 3) + rowIndexModifier;
      const columnIndex = (count % 3) + columnIndexModifier;

      console.log(rowIndex, columnIndex);
    }
  }
};

module.exports = {
  printGrid,
  printGridAsData
};
