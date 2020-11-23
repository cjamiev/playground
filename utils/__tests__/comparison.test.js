const { isEqualTestData } = require('testHelper/testData/comparison-data');
const { testFunctionHelper } = require('testHelper/helper');
const { cloneDeep } = require('object-operations');
const { isEqual } = require('comparison');

const targetObject = {
  one: 1,
  two: {
    one: 21
  },
  four: {
    one: {
      two: 412
    }
  }
};

describe(':isEqual', () => {
  it('clone test', () => {
    const clonedObject = cloneDeep(targetObject);

    expect(isEqual(targetObject, clonedObject)).toBeTruthy();
  });

  isEqualTestData.forEach(data => testFunctionHelper(data, isEqual));
});