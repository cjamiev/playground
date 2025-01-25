import { truthPermutatorTestData } from './testData/permutator-data';
import { testFunctionHelper } from './testHelper';
import { truthPermutator } from '../utils/permutator';

describe(':truthPermutator', () => {
  truthPermutatorTestData.forEach((data) => testFunctionHelper(data, truthPermutator));
});
