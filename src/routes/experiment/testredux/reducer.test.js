import { ADD_TEST, REMOVE_TEST } from './actions';
import reducer from './reducer';

const initialState = [1,2,2];

describe('reducer', () => {
  it('default', () => {
    const result = reducer(undefined, {});

    expect(result).toEqual([1]);
  });

  it('ADD_TEST', () => {
    const action = {
      type: ADD_TEST,
      data: 3
    };
    const result = reducer(initialState, action);

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
    const result = reducer(initialState, action);

    expect(result).toEqual([1]);
  });
});