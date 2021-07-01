import { LOAD_PASSWORD, ERROR_PASSWORD } from './clipboardActions';
import clipboardReducer from './clipboardReducer';

const initialState = {
  passwords: [],
  error: {}
};

describe('clipboardReducer', () => {
  it('default', () => {
    const result = clipboardReducer(undefined, {});

    expect(result).toEqual(initialState);
  });

  it('LOAD_PASSWORD', () => {
    const action = {
      type: LOAD_PASSWORD,
      data: [1,2,3]
    };
    const result = clipboardReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      passwords: action.data
    });
  });

  it('ERROR_PASSWORD', () => {
    const action = {
      type: ERROR_PASSWORD,
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