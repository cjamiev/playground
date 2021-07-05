import { LOAD_COMMAND_RESULT, ERROR_COMMAND_RESULT } from './listActions';
import listReducer from './listReducer';

const initialState = {
  commandResponse: ''
};

describe('listReducer', () => {
  it('default', () => {
    const result = listReducer(undefined, {});

    expect(result).toEqual(initialState);
  });

  it('LOAD_COMMAND_RESULT', () => {
    const action = {
      type: LOAD_COMMAND_RESULT,
      data: 'test-message'
    };
    const result = listReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      commandResponse: action.data
    });
  });

  it('ERROR_COMMAND_RESULT', () => {
    const action = {
      type: ERROR_COMMAND_RESULT,
      error: {
        message: 'test-error'
      }
    };
    const result = listReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      commandResponse: action.error
    });
  });
});