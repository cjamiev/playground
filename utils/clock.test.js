import {
  clockBetweenDatesTestData,
  formattedClockTestData,
  normalizeClockTestData
} from 'testHelper/testData/clock-data';
import { testFunctionHelper } from 'testHelper/helper';
import {
  clockBetweenDates,
  formattedClock,
  normalizeClock
} from './clock';

describe(':clockBetweenDates', () => {
  clockBetweenDatesTestData.forEach(data => testFunctionHelper(data, clockBetweenDates));
});

describe(':formattedClock', () => {
  formattedClockTestData.forEach(data => testFunctionHelper(data, formattedClock));
});

describe(':normalizeClock', () => {
  normalizeClockTestData.forEach(data => testFunctionHelper(data, normalizeClock));
});