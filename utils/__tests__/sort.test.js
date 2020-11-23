const {
  alphaAscendingSortTestData,
  alphaDescendingSortTestData,
  numericAscendingSortTestData,
  numericDescendingSortTestData,
  sortByDelimiterTestData
} = require('testHelper/testData/sort-data');
const { testFunctionHelper } = require('testHelper/helper');
const {
  alphaAscendingSort,
  alphaDescendingSort,
  numericAscendingSort,
  numericDescendingSort,
  sortByDelimiter
} = require('sort');

describe(':alphaAscendingSort', () => {
  alphaAscendingSortTestData.forEach(data => testFunctionHelper(data, alphaAscendingSort));
});

describe(':alphaDescendingSort', () => {
  alphaDescendingSortTestData.forEach(data => testFunctionHelper(data, alphaDescendingSort));
});

describe(':numericAscendingSort', () => {
  numericAscendingSortTestData.forEach(data => testFunctionHelper(data, numericAscendingSort));
});

describe(':numericDescendingSort', () => {
  numericDescendingSortTestData.forEach(data => testFunctionHelper(data, numericDescendingSort));
});

describe(':sortByDelimiter', () => {
  sortByDelimiterTestData.forEach(data => testFunctionHelper(data, sortByDelimiter));
});