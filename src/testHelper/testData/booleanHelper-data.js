const isEmptyTestData = [
  { testMessage: '', args: [], expectedResult: true },
  { testMessage: '', args: [null], expectedResult: true },
  { testMessage: '', args: [''], expectedResult: true },
  { testMessage: '', args: [false], expectedResult: true },
  { testMessage: '', args: [0], expectedResult: true },
  { testMessage: '', args: [{}], expectedResult: true },
  { testMessage: '', args: [[]], expectedResult: true },
  { testMessage: '', args: [{ one: null }], expectedResult: true },
  { testMessage: '', args: [{ one: undefined }], expectedResult: true },
  { testMessage: '', args: [{ one: '' }], expectedResult: false },
  { testMessage: '', args: [{ one: 0 }], expectedResult: false },
  { testMessage: '', args: [{ one: false }], expectedResult: false },
  { testMessage: '', args: [{ one: {} }], expectedResult: false },
  { testMessage: '', args: [{ one: [] }], expectedResult: false },
  { testMessage: '', args: [[1]], expectedResult: false }
];

const xOrTestData = [
  {
    testMessage: 'both false',
    args: [false, false],
    expectedResult: false
  },
  {
    testMessage: 'false then true',
    args: [false, true],
    expectedResult: true
  },
  {
    testMessage: 'true then false',
    args: [true, false],
    expectedResult: true
  },
  {
    testMessage: 'both true',
    args: [true, true],
    expectedResult: false
  }
];

export {
  isEmptyTestData,
  xOrTestData
};