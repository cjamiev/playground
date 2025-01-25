import { replaceLineTestData } from './testData/replace-data';
import { testFunctionHelper } from './testHelper';
import { replaceLine } from '../utils/replace';

describe(':replaceLine', () => {
  replaceLineTestData.forEach((data) => testFunctionHelper(data, replaceLine));
});
