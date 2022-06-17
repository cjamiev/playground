import { isEqualTestData } from 'testHelper/testData/comparison-data';
import { testFunctionHelper } from 'testHelper';
import { cloneDeep } from './objectHelper';
import { isEqual } from './comparison';

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

  isEqualTestData.forEach((data) => testFunctionHelper(data, isEqual));
});
