const isEqualTestData = [
  { testMessage: 'unequal number comparison', args: [-1, 1], expectedResult: false },
  { testMessage: 'equal number comparison', args: [1, 1], expectedResult: true },
  { testMessage: 'empty string comparison', args: ['', ''], expectedResult: true },
  { testMessage: 'unequal string comparison', args: ['a', 'A'], expectedResult: false },
  { testMessage: 'equal string comparison', args: ['abc', 'abc'], expectedResult: true },
  { testMessage: 'number string comparison', args: ['5', 5], expectedResult: false },
  { testMessage: 'equal boolean comparison', args: [false, false], expectedResult: true },
  { testMessage: 'unequal boolean comparison', args: [true, false], expectedResult: false },
  { testMessage: 'equal null comparison', args: [null, null], expectedResult: true },
  { testMessage: 'equal undefined comparison', args: [undefined, undefined], expectedResult: true },
  { testMessage: 'unequal undefined null comparison', args: [undefined, null], expectedResult: false },
  { testMessage: 'equal empty object comparison', args: [{}, {}], expectedResult: true },
  { testMessage: 'unequal one empty one non-empty object comparison', args: [{}, { one: 1 }], expectedResult: false },
  { testMessage: 'equal object comparison', args: [{ one: [1, 2], two: { three: false } }, { one: [1, 2], two: { three: false } }], expectedResult: true },
  { testMessage: 'unequal object comparison', args: [{ one: [1, 2], two: false }, { one: [1, 2], two: false, three: true }], expectedResult: false },
  { testMessage: 'equal empty array comparison', args: [[], []], expectedResult: true },
  { testMessage: 'equal array comparison', args: [[1, 2, 3], [1, 2, 3]], expectedResult: true },
  { testMessage: 'unequal array comparison', args: [[1, 2, 3], [1, 3, 2]], expectedResult: false }
];

module.exports = { isEqualTestData };