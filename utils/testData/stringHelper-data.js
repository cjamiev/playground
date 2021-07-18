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


const toDashCaseFromCamelCaseData = [
  { testMessage: 'empty', args: [''], expectedResult: '' },
  { testMessage: 'numbers and symbol', args: ['a$$l3'], expectedResult: 'a$$l3' },
  { testMessage: 'css property with one dash', args: ['borderRadius'], expectedResult: 'border-radius' },
  { testMessage: 'css property with two dashes', args: ['borderRightRadius'], expectedResult: 'border-right-radius' }
];

const toCamelCaseFromDashCaseData = [
  { testMessage: 'empty', args: [''], expectedResult: '' },
  { testMessage: 'numbers and symbol', args: ['a$$l3'], expectedResult: 'a$$l3' },
  { testMessage: 'css property with one dash', args: ['border-radius'], expectedResult: 'borderRadius' },
  { testMessage: 'css property with two dashes', args: ['border-right-radius'], expectedResult: 'borderRightRadius' }
];

export {
  reverseStringTestData,
  toDashCaseFromCamelCaseData,
  toCamelCaseFromDashCaseData
};