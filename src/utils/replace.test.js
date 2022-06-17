import { replaceLineTestData } from 'testHelper/testData/replace-data';
import { testFunctionHelper } from 'testHelper';
import { replaceLine } from './replace';

describe(':replaceLine', () => {
  replaceLineTestData.forEach((data) => testFunctionHelper(data, replaceLine));
});
