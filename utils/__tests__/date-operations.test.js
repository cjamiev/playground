const {
  changeByDaysTestData,
  daysBetweenTestData,
  weeksBetweenTestData
} = require('testHelper/testData/date-operations-data');
const { testFunctionHelper } = require('testHelper/helper');
const {
  changeByDays,
  daysBetween,
  weeksBetween
} = require('date-operations');

describe(':changeByDays', () => {
  changeByDaysTestData.forEach(data => testFunctionHelper(data, changeByDays));
});

describe(':daysBetween', () => {
  daysBetweenTestData.forEach(data => testFunctionHelper(data, daysBetween));
});

describe(':weeksBetween', () => {
  weeksBetweenTestData.forEach(data => testFunctionHelper(data, weeksBetween));
});