import { truthPermutatorTestData } from 'testHelper/testData/permutator-data';
import { testFunctionHelper } from 'testHelper/helper';
import {
  truthPermutator
} from './permutator';

describe(':truthPermutator', () => {
  truthPermutatorTestData.forEach(data => testFunctionHelper(data, truthPermutator));
});
