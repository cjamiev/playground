const input = {
  one: 1,
  two: {
    twoOne: 21,
    twoTwo: {
      twoTwoOne: 221
    }
  },
  three: [
    {
      id: 1
    },
    {
      id: 2
    }
  ]
};

const resolvePathTestData = [
  { testMessage: 'no arguments', args: [], expectedResult: undefined },
  { testMessage: 'empty', args: [{}, ''], expectedResult: undefined },
  { testMessage: 'first layer', args: [input, 'one'], expectedResult: 1 },
  { testMessage: 'second layer', args: [input, 'two.twoOne'], expectedResult: 21 },
  { testMessage: 'third layer', args: [input, 'two.twoTwo.twoTwoOne'], expectedResult: 221 },
  { testMessage: 'access internal array', args: [input, 'three.1.id'], expectedResult: 2 }
];

const getObjectPathTestData = [
  {
    testMessage: 'should list all key paths',
    args: [input],
    expectedResult: [
      'one',
      'two.twoOne',
      'two.twoTwo.twoTwoOne',
      'three.0.id',
      'three.1.id'
    ]
  }
];

export {
  getObjectPathTestData,
  resolvePathTestData
};