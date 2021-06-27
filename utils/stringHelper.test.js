import { reverseStringTestData } from './testData/stringHelper-data';
import { testFunctionHelper } from 'testHelper';
import { reverseString } from './stringHelper';

describe(':reverseString', () => {
  reverseStringTestData.forEach(data => testFunctionHelper(data, reverseString));
});
