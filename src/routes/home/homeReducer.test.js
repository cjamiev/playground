import {
  LOAD_DIRECTORY,
  ERROR_DIRECTORY,
  LOAD_FILE,
  ERROR_FILE,
  WRITE_FILE
} from './homeActions';
import homeReducer, { homeInitialState } from './homeReducer';

describe('homeReducer', () => {
  it('default', () => {
    const result = homeReducer(undefined, {});

    expect(result).toEqual(homeInitialState);
  });

  it('LOAD_DIRECTORY', () => {
    const action = {
      type: LOAD_DIRECTORY,
      data: [1,2,3]
    };
    const result = homeReducer(homeInitialState, action);

    expect(result).toEqual({
      ...homeInitialState,
      directory: action.data
    });
  });

  it('ERROR_DIRECTORY', () => {
    const action = {
      type: ERROR_DIRECTORY,
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

  it('LOAD_FILE', () => {
    const action = {
      type: LOAD_FILE,
      data: 'test-file'
    };
    const result = homeReducer(homeInitialState, action);

    expect(result).toEqual({
      ...homeInitialState,
      file: action.data
    });
  });

  it('ERROR_FILE', () => {
    const action = {
      type: ERROR_FILE,
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

  it('WRITE_FILE', () => {
    const action = {
      type: WRITE_FILE,
      data: {
        message: 'Successful'
      }
    };
    const result = homeReducer(homeInitialState, action);

    expect(result).toEqual({
      ...homeInitialState,
      result: action.data
    });
  });
});