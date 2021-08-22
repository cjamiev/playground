import { LOAD_COMMAND_RESULT, ERROR_COMMAND_RESULT } from './listActions';
import listReducer, { listInitialState } from './listReducer';

describe('listReducer', () => {
  it('default', () => {
    const result = listReducer(undefined, {});

    expect(result).toEqual(listInitialState);
  });

  it('LOAD_COMMAND_RESULT', () => {
    const action = {
      type: LOAD_COMMAND_RESULT,
      data: 'test-message'
    };
    const result = listReducer(listInitialState, action);

    expect(result).toEqual({
      ...listInitialState,
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
    const result = listReducer(listInitialState, action);

    expect(result).toEqual({
      ...listInitialState,
      commandResponse: action.error
    });
  });
});