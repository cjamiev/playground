import { LOAD_HOME, ERROR_HOME } from './homeActions';
import homeReducer, { homeInitialState } from './homeReducer';

describe('homeReducer', () => {
  it('default', () => {
    const result = homeReducer(undefined, {});

    expect(result).toEqual(homeInitialState);
  });

  it('LOAD_HOME', () => {
    const action = {
      type: LOAD_HOME,
      data: {
        one: [1,2,3],
        two: [4,5,6]
      }
    };
    const result = homeReducer(homeInitialState, action);

    expect(result).toEqual({
      ...homeInitialState,
      home: action.data
    });
  });

  it('ERROR_HOME', () => {
    const action = {
      type: ERROR_HOME,
      error: {
        message: 'test-error'
      }
    };
    const result = homeReducer(homeInitialState, action);

    expect(result).toEqual({
      ...homeInitialState,
      error: action.error
    });
  });

});