const { isEmptyTestData, xOrTestData } = require('testHelper/testData/boolean-operations-data');
const { testFunctionHelper } = require('testHelper/helper');
const {
  isEmpty,
  xOr
} = require('boolean-operations');

describe(':xOr', () => {
  xOrTestData.forEach(data => testFunctionHelper(data, xOr));
});

describe(':isEmpty', () => {
  isEmptyTestData.forEach(data => testFunctionHelper(data, isEmpty));
});