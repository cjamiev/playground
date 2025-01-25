import { isEqualTestData } from './testData/comparison-data';
import { testFunctionHelper } from './testHelper';
import { cloneDeep } from '../utils/objectHelper';
import { isEqual } from '../utils/comparison';

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
