import { changeByDaysTestData, daysBetweenTestData, weeksBetweenTestData } from 'testData/dateHelper-data';
import { testFunctionHelper } from 'testHelper';
import { changeByDays, daysBetween, weeksBetween } from './dateHelper';

describe(':changeByDays', () => {
  changeByDaysTestData.forEach((data) => testFunctionHelper(data, changeByDays));
});

describe(':daysBetween', () => {
  daysBetweenTestData.forEach((data) => testFunctionHelper(data, daysBetween));
});

describe(':weeksBetween', () => {
  weeksBetweenTestData.forEach((data) => testFunctionHelper(data, weeksBetween));
});
