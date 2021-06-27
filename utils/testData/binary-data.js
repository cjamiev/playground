const convertDecimalToBinaryTestData = [
  {
    testMessage: 'no argument',
    args: [],
    expectedResult: '0'
  },
  {
    testMessage: 'zero',
    args: [0],
    expectedResult: '0'
  },
  {
    testMessage: 'one',
    args: [1],
    expectedResult: '1'
  },
  {
    testMessage: 'two',
    args: [2],
    expectedResult: '10'
  },
  {
    testMessage: 'ten',
    args: [10],
    expectedResult: '1010'
  },
  {
    testMessage: 'minus ten',
    args: [-10],
    expectedResult: '-1010'
  }
];

export {
  convertDecimalToBinaryTestData
};
