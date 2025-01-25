import { randomBoolean, randomNumber, randomString, randomObject, dataGenerator } from '../utils/randomHelper';

const ZERO = 0;
const ONE = 1;
const TWO = 2;

describe('utils/randomHelper', () => {
  it(':randomBoolean', () => {
    expect(typeof randomBoolean()).toEqual('boolean');
  });

  it(':randomNumber', () => {
    expect(typeof randomNumber()).toEqual('number');
  });

  it(':randomString', () => {
    expect(typeof randomString()).toEqual('string');
  });

  it(':randomObject', () => {
    const sample = {
      one: '1',
      two: 2,
      three: false
    };
    const result = randomObject(sample);

    expect(Object.keys(result)).toEqual(Object.keys(sample));
    expect(typeof result.three).toEqual('boolean');
    expect(typeof result.two).toEqual('number');
    expect(typeof result.one).toEqual('string');
  });

  it(':dataGenerator', () => {
    const sample = {
      one: '1',
      two: 2,
      three: false
    };
    const sampleKeys = Object.keys(sample);
    const result = dataGenerator(sample, TWO);
    const itemOne = result[ZERO];
    const itemTwo = result[ONE];

    expect(Object.keys(itemOne)).toEqual(sampleKeys);
    expect(Object.keys(itemTwo)).toEqual(sampleKeys);
    expect(result.length).toEqual(TWO);
    expect(typeof itemOne.three).toEqual('boolean');
    expect(typeof itemOne.two).toEqual('number');
    expect(typeof itemOne.one).toEqual('string');
    expect(typeof itemTwo.three).toEqual('boolean');
    expect(typeof itemTwo.two).toEqual('number');
    expect(typeof itemTwo.one).toEqual('string');
  });
});
