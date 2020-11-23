const { truthPermutatorTestData } = require('testHelper/testData/permutator-data');
const { testFunctionHelper } = require('testHelper/helper');
const {
  truthPermutator
} = require('permutator');

describe(':truthPermutator', () => {
  truthPermutatorTestData.forEach(data => testFunctionHelper(data, truthPermutator));
});
