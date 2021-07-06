import { ADD_TEST, REMOVE_TEST } from './actions';
import testRedux from './testReduxReducer';

const initialState = [1,2,2];

describe('testRedux', () => {
  it('default', () => {
    const result = testRedux(undefined, {});

    expect(result).toEqual([1]);
  });

  it('ADD_TEST', () => {
    const action = {
      type: ADD_TEST,
      data: 3
    };
    const result = testRedux(initialState, action);

    expect(result).toEqual([
      ...initialState,
      action.data
    ]);
  });

  it('REMOVE_TEST', () => {
    const action = {
      type: REMOVE_TEST,
      data: 2
    };
    const result = testRedux(initialState, action);

    expect(result).toEqual([1]);
  });
});