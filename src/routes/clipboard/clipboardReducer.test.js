import { LOAD_PASSWORD, ERROR_PASSWORD, LOAD_FOOD, ERROR_FOOD, LOAD_MAIN, ERROR_MAIN } from './clipboardActions';
import clipboardReducer from './clipboardReducer';

const initialState = {
  passwords: [],
  food: [],
  main: [],
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

  it('LOAD_FOOD', () => {
    const action = {
      type: LOAD_FOOD,
      data: [1,2,3]
    };
    const result = clipboardReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
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
    const result = clipboardReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: action.error
    });
  });

  it('LOAD_MAIN', () => {
    const action = {
      type: LOAD_MAIN,
      data: [1,2,3]
    };
    const result = clipboardReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
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
    const result = clipboardReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: action.error
    });
  });
});