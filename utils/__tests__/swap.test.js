const {
  swapPositionsTestData,
  decrementIndexTestData,
  incrementIndexTestData
} = require('testHelper/testData/swap-data');
const { testFunctionHelper } = require('testHelper/helper');
const {
  decrementIndex,
  incrementIndex,
  swapPositions
} = require('swap');

describe(':decrementIndex', () => {
  decrementIndexTestData.forEach(data => testFunctionHelper(data, decrementIndex));
});

describe(':incrementIndex', () => {
  incrementIndexTestData.forEach(data => testFunctionHelper(data, incrementIndex));
});

describe(':swapPositions', () => {
  swapPositionsTestData.forEach(data => testFunctionHelper(data, swapPositions));
});
