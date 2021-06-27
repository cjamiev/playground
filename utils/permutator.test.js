import { truthPermutatorTestData } from './testData/permutator-data';
import { testFunctionHelper } from 'testHelper';
import {
  truthPermutator
} from './permutator';

describe(':truthPermutator', () => {
  truthPermutatorTestData.forEach(data => testFunctionHelper(data, truthPermutator));
});
