
const replaceLineTestData = [
  {
    testMessage: 'empty argument',
    args: ['one two three', {}],
    expectedResult: 'one two three'
  },
  {
    testMessage: 'single argument',
    args: ['one two three', { one: 1 }],
    expectedResult: '1 two three'
  },
  {
    testMessage: 'single argument all same items',
    args: ['one one one', { one: 1 }],
    expectedResult: '1 1 1'
  },
  {
    testMessage: 'single argument no matching item',
    args: ['one two three', { four: 1 }],
    expectedResult: 'one two three'
  }
];

module.exports = {
  replaceLineTestData
};
