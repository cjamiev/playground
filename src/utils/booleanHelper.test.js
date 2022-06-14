import { isEmptyTestData, xOrTestData } from 'testData/booleanHelper-data';
import { testFunctionHelper } from 'testHelper';
import { isEmpty, xOr } from './booleanHelper';

describe(':xOr', () => {
  xOrTestData.forEach((data) => testFunctionHelper(data, xOr));
});

describe(':isEmpty', () => {
  isEmptyTestData.forEach((data) => testFunctionHelper(data, isEmpty));
});
