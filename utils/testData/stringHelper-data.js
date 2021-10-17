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

const toDashCaseFromCamelCaseTestData = [
  { testMessage: 'empty', args: [''], expectedResult: '' },
  { testMessage: 'numbers and symbol', args: ['a$$l3'], expectedResult: 'a$$l3' },
  { testMessage: 'css property with one dash', args: ['borderRadius'], expectedResult: 'border-radius' },
  { testMessage: 'css property with two dashes', args: ['borderRightRadius'], expectedResult: 'border-right-radius' }
];

const toCamelCaseFromDashCaseTestData = [
  { testMessage: 'empty', args: [''], expectedResult: '' },
  { testMessage: 'numbers and symbol', args: ['a$$l3'], expectedResult: 'a$$l3' },
  { testMessage: 'css property with one dash', args: ['border-radius'], expectedResult: 'borderRadius' },
  { testMessage: 'css property with two dashes', args: ['border-right-radius'], expectedResult: 'borderRightRadius' }
];

const getEllipsisForLongTextTestData = [
  { testMessage: 'empty', args: ['', 5], expectedResult: '' },
  { testMessage: 'max less than string', args: ['12345', 3], expectedResult: '123...' },
  { testMessage: 'max greater than string', args: ['12345', 8], expectedResult: '12345' }
];

export {
  reverseStringTestData,
  toDashCaseFromCamelCaseTestData,
  toCamelCaseFromDashCaseTestData,
  getEllipsisForLongTextTestData
};