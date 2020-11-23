const { replaceLineTestData } = require('testHelper/testData/replace-data');
const { testFunctionHelper } = require('testHelper/helper');
const { replaceLine } = require('replace');

describe(':replaceLine', () => {
  replaceLineTestData.forEach(data => testFunctionHelper(data, replaceLine));
});
