import { LOAD_CLIPBOARD, ERROR_CLIPBOARD } from './clipboardActions';
import clipboardReducer from './clipboardReducer';

const initialState = {
  value: [],
  error: {}
};

describe('clipboardReducer', () => {
  it('default', () => {
    const result = clipboardReducer(undefined, {});

    expect(result).toEqual(initialState);
  });

  it('LOAD_CLIPBOARD', () => {
    const action = {
      type: LOAD_CLIPBOARD,
      data: [1,2,3]
    };
    const result = clipboardReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      value: action.data
    });
  });

  it('ERROR_CLIPBOARD', () => {
    const action = {
      type: ERROR_CLIPBOARD,
      error: {
        message: 'test-error'
      }
    };
    const result = clipboardReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: action.error
    });
  });
});