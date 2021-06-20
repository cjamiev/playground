import { reverseStringTestData } from 'testHelper/testData/stringHelper-data';
import { testFunctionHelper } from 'testHelper/helper';
import { reverseString } from './stringHelper';

describe(':reverseString', () => {
  reverseStringTestData.forEach(data => testFunctionHelper(data, reverseString));
});
