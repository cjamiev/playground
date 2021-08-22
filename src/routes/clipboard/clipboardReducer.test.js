import { LOAD_PASSWORD, ERROR_PASSWORD, LOAD_FOOD, ERROR_FOOD, LOAD_MAIN, ERROR_MAIN } from './clipboardActions';
import clipboardReducer, { clipboardInitialState } from './clipboardReducer';

describe('clipboardReducer', () => {
  it('default', () => {
    const result = clipboardReducer(undefined, {});

    expect(result).toEqual(clipboardInitialState);
  });

  it('LOAD_PASSWORD', () => {
    const action = {
      type: LOAD_PASSWORD,
      data: [1,2,3]
    };
    const result = clipboardReducer(clipboardInitialState, action);

    expect(result).toEqual({
      ...clipboardInitialState,
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
    const result = clipboardReducer(clipboardInitialState, action);

    expect(result).toEqual({
      ...clipboardInitialState,
      error: action.error
    });
  });

  it('LOAD_FOOD', () => {
    const action = {
      type: LOAD_FOOD,
      data: [1,2,3]
    };
    const result = clipboardReducer(clipboardInitialState, action);

    expect(result).toEqual({
      ...clipboardInitialState,
      food: action.data
    });
  });

  it('ERROR_FOOD', () => {
    const action = {
      type: ERROR_FOOD,
      error: {
        message: 'test-error'
      }
    };
    const result = clipboardReducer(clipboardInitialState, action);

    expect(result).toEqual({
      ...clipboardInitialState,
      error: action.error
    });
  });

  it('LOAD_MAIN', () => {
    const action = {
      type: LOAD_MAIN,
      data: [1,2,3]
    };
    const result = clipboardReducer(clipboardInitialState, action);

    expect(result).toEqual({
      ...clipboardInitialState,
      main: action.data
    });
  });

  it('ERROR_MAIN', () => {
    const action = {
      type: ERROR_MAIN,
      error: {
        message: 'test-error'
      }
    };
    const result = clipboardReducer(clipboardInitialState, action);

    expect(result).toEqual({
      ...clipboardInitialState,
      error: action.error
    });
  });
});