import {
  isEmpty,
  isNotEmpty,
  cloneDeep,
  isEqual
} from 'src/utils/utility';

const emptyData = [
  null,
  undefined,
  {},
  [],
  { one: null }
];
const notEmptyData = [
  {
    one: 1
  },
  {
    one: 1,
    two: {
      one: 21
    }
  },
  [1],
  [1, 2, 3]
];
const targetObject = {
  one: 1,
  two: {
    one: 21
  },
  three: {
    one: {
      two: 312
    }
  },
  four: {
    one: 41,
    two: {
      one: 421
    }
  }
};

describe(':isEmpty', () => {
  const testEmptyData = (data) => {
    it(`data:${JSON.stringify(data)}`, () => {
      expect(isEmpty(data)).toBeTruthy();
    });
  };

  const testNotEmptyData = (data) => {
    it(`data:${JSON.stringify(data)}`, () => {
      expect(isEmpty(data)).toBeFalsy();
    });
  };

  emptyData.forEach(testEmptyData);
  notEmptyData.forEach(testNotEmptyData);
});

describe(':isNotEmpty', () => {
  const testIsEmptyData = (data) => {
    it(`data:${JSON.stringify(data)}`, () => {
      expect(isNotEmpty(data)).toBeFalsy();
    });
  };

  const testIsNotEmptyData = (data) => {
    it(`data:${JSON.stringify(data)}`, () => {
      expect(isNotEmpty(data)).toBeTruthy();
    });
  };

  emptyData.forEach(testIsEmptyData);
  notEmptyData.forEach(testIsNotEmptyData);
});

it(':clonedObject', () => {
  const clonedObject = cloneDeep(targetObject);
  clonedObject.one = 11;
  clonedObject.two.one = 121;
  clonedObject.three.one.two = 1312;

  expect(clonedObject.four.one).toEqual(41);
  expect(clonedObject.four.two.one).toEqual(421);
  expect(targetObject.one).toEqual(1);
  expect(targetObject.two.one).toEqual(21);
  expect(targetObject.three.one.two).toEqual(312);
});

describe(':isEqual', () => {
  it('identical object', () => {
    const clonedObject = cloneDeep(targetObject);

    expect(isEqual(targetObject, clonedObject)).toBeTruthy();
  });

  it('different object', () => {
    const clonedObject = cloneDeep(targetObject);
    clonedObject.one = 11;

    expect(isEqual(targetObject, clonedObject)).toBeFalsy();
  });

  const testEmptyData = (data) => {
    it(`data:${JSON.stringify(data)}`, () => {
      expect(isEqual(targetObject, data)).toBeFalsy();
    });
  };

  const testNotEmptyData = (data) => {
    it(`data:${JSON.stringify(data)}`, () => {
      expect(isEqual(targetObject, data)).toBeFalsy();
    });
  };

  emptyData.forEach(testEmptyData);
  notEmptyData.forEach(testNotEmptyData);
});