/* eslint-disable no-magic-numbers */
import { loadFile, writeToFile } from './io';
import { unitTest } from './unitTest';
import { comparePerformanceTests, performanceTest } from './performanceTest';

const squareTestData = [
  { testMessage: 'zero', args: [0], expectedResult: 0 },
  { testMessage: 'positive', args: [2], expectedResult: 4 },
  { testMessage: 'negative', args: [-2], expectedResult: 4 },
  { testMessage: 'non-integer error', args: ['a'], expectedResult: 'error message' }
];

const square = (value) => {
  return value * value;
};

unitTest(squareTestData, square);

/*
const temp1 = loadFile('./tmp/temp1.txt');

console.log(temp1);
*/
