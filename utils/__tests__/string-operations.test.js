const { reverseStringTestData } = require('testHelper/testData/string-operations-data');
const { testFunctionHelper } = require('testHelper/helper');
const { reverseString } = require('string-operations');

describe(':reverseString', () => {
  reverseStringTestData.forEach(data => testFunctionHelper(data, reverseString));
});
