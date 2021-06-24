import {
  clockBetweenDatesTestData,
  formattedTimerClockTestData,
  normalizeClockTestData,
  getFormattedClockTestData,
  getFormattedDateTestData
} from 'testHelper/testData/clock-data';
import { testFunctionHelper } from 'testHelper/helper';
import {
  clockBetweenDates,
  formattedTimerClock,
  normalizeClock,
  getFormattedClock,
  getFormattedDate
} from './clock';

describe(':clockBetweenDates', () => {
  clockBetweenDatesTestData.forEach(data => testFunctionHelper(data, clockBetweenDates));
});

describe(':formattedTimerClock', () => {
  formattedTimerClockTestData.forEach(data => testFunctionHelper(data, formattedTimerClock));
});

describe(':normalizeClock', () => {
  normalizeClockTestData.forEach(data => testFunctionHelper(data, normalizeClock));
});

describe(':getFormattedClock', () => {
  getFormattedClockTestData.forEach(data => testFunctionHelper(data, getFormattedClock));
});

describe(':getFormattedDate', () => {
  getFormattedDateTestData.forEach(data => testFunctionHelper(data, getFormattedDate));
});