const { convertDecimalToBinaryTestData } = require('testHelper/testData/binary-data');
const { testFunctionHelper } = require('testHelper/helper');
const { convertDecimalToBinary } = require('binary');

describe(':convertDecimalToBinary', () => {
  convertDecimalToBinaryTestData.forEach(data => testFunctionHelper(data, convertDecimalToBinary));
});
