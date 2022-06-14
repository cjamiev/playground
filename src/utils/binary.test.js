import { convertDecimalToBinaryTestData } from 'testData/binary-data';
import { testFunctionHelper } from 'testHelper';
import { convertDecimalToBinary } from './binary';

describe(':convertDecimalToBinary', () => {
  convertDecimalToBinaryTestData.forEach((data) => testFunctionHelper(data, convertDecimalToBinary));
});
