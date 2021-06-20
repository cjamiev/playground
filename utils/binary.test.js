import { convertDecimalToBinaryTestData } from 'testHelper/testData/binary-data';
import { testFunctionHelper } from 'testHelper/helper';
import { convertDecimalToBinary } from './binary';

describe(':convertDecimalToBinary', () => {
  convertDecimalToBinaryTestData.forEach(data => testFunctionHelper(data, convertDecimalToBinary));
});
