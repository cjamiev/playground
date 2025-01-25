import { convertDecimalToBinaryTestData } from './testData/binary-data';
import { testFunctionHelper } from './testHelper';
import { convertDecimalToBinary } from '../utils/binary';

describe(':convertDecimalToBinary', () => {
  convertDecimalToBinaryTestData.forEach((data) => testFunctionHelper(data, convertDecimalToBinary));
});
