const truthPermutatorTestData = [
  {
    testMessage: 'no argument',
    args: [],
    expectedResult: [{}]
  },
  {
    testMessage: 'single item',
    args: [['state1']],
    expectedResult: [{ state1: false }, { state1: true }]
  },
  {
    testMessage: 'two items',
    args: [['state1', 'state2']],
    expectedResult: [
      { state1: false, state2: false },
      { state1: true, state2: false },
      { state1: false, state2: true },
      { state1: true, state2: true }
    ]
  }
];

module.exports = {
  truthPermutatorTestData
};
