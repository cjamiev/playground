import { replaceLineTestData } from 'testHelper/testData/replace-data';
import { testFunctionHelper } from 'testHelper/helper';
import { replaceLine } from './replace';

describe(':replaceLine', () => {
  replaceLineTestData.forEach(data => testFunctionHelper(data, replaceLine));
});
