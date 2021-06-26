const reverseStringTestData = [
  {
    testMessage: 'no argument',
    args: [],
    expectedResult: ''
  },
  {
    testMessage: 'empty argument',
    args: [''],
    expectedResult: ''
  },
  {
    testMessage: 'single character',
    args: ['a'],
    expectedResult: 'a'
  },
  {
    testMessage: 'triple same character',
    args: ['aaa'],
    expectedResult: 'aaa'
  },
  {
    testMessage: 'triple character middle character different',
    args: ['aba'],
    expectedResult: 'aba'
  },
  {
    testMessage: 'all different character',
    args: ['abcdef'],
    expectedResult: 'fedcba'
  }
];

export {
  reverseStringTestData
};