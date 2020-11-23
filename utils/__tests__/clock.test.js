const {
  clockBetweenDatesTestData,
  formattedClockTestData,
  normalizeClockTestData
} = require('testHelper/testData/clock-data');
const { testFunctionHelper } = require('testHelper/helper');
const {
  clockBetweenDates,
  formattedClock,
  normalizeClock
} = require('clock');

describe(':clockBetweenDates', () => {
  clockBetweenDatesTestData.forEach(data => testFunctionHelper(data, clockBetweenDates));
});

describe(':formattedClock', () => {
  formattedClockTestData.forEach(data => testFunctionHelper(data, formattedClock));
});

describe(':normalizeClock', () => {
  normalizeClockTestData.forEach(data => testFunctionHelper(data, normalizeClock));
});