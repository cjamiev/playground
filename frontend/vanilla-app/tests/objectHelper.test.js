import { getObjectPathTestData, resolvePathTestData } from './testData/objectHelper-data';
import { testFunctionHelper } from './testHelper';
import { cloneDeep, getObjectPath, map, removeProperty, resolvePath } from '../utils/objectHelper';

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

it(':clonedObject', () => {
  const clonedObject = cloneDeep(targetObject);
  clonedObject.one = 11;
  clonedObject.four.one.two = 1412;

  expect(clonedObject.one).toEqual(11);
  expect(clonedObject.two.one).toEqual(21);
  expect(clonedObject.four.one.two).toEqual(1412);
  expect(targetObject.one).toEqual(1);
  expect(targetObject.two.one).toEqual(21);
  expect(targetObject.four.one.two).toEqual(412);
});

it(':map', () => {
  const obj = {
    one: 4,
    1: 5,
    2: 6,
    length: 3
  };
  const expectedResult = {
    one: 5,
    1: 6,
    2: 7,
    length: 4
  };

  const recievedResult = map((item) => item + 1)(obj);

  expect(recievedResult).toEqual(expectedResult);
});

it(':removeProperty', () => {
  const expectedResult = { one: 1, four: { one: { two: 412 } } };

  const recievedResult = removeProperty('two')(targetObject);

  expect(recievedResult).toEqual(expectedResult);
});

describe(':getObjectPath', () => {
  getObjectPathTestData.forEach((data) => testFunctionHelper(data, getObjectPath));
});

describe(':resolvePath', () => {
  resolvePathTestData.forEach((data) => testFunctionHelper(data, resolvePath));
});
