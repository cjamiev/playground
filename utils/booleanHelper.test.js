import { isEmptyTestData, xOrTestData } from 'testHelper/testData/booleanHelper-data';
import { testFunctionHelper } from 'testHelper/helper';
import {
  isEmpty,
  xOr
} from './booleanHelper';

describe(':xOr', () => {
  xOrTestData.forEach(data => testFunctionHelper(data, xOr));
});

describe(':isEmpty', () => {
  isEmptyTestData.forEach(data => testFunctionHelper(data, isEmpty));
});