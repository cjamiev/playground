import {
  LOAD_DIRECTORY,
  ERROR_DIRECTORY,
  LOAD_FILE,
  ERROR_FILE,
  WRITE_FILE
} from './fileActions';
import fileReducer, { fileInitialState } from './fileReducer';

describe('fileReducer', () => {
  it('default', () => {
    const result = fileReducer(undefined, {});

    expect(result).toEqual(fileInitialState);
  });

  it('LOAD_DIRECTORY', () => {
    const action = {
      type: LOAD_DIRECTORY,
      data: [1,2,3]
    };
    const result = fileReducer(fileInitialState, action);

    expect(result).toEqual({
      ...fileInitialState,
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
    const result = fileReducer(fileInitialState, action);

    expect(result).toEqual({
      ...fileInitialState,
      error: action.error
    });
  });

  it('LOAD_FILE', () => {
    const action = {
      type: LOAD_FILE,
      data: 'test-file'
    };
    const result = fileReducer(fileInitialState, action);

    expect(result).toEqual({
      ...fileInitialState,
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
    const result = fileReducer(fileInitialState, action);

    expect(result).toEqual({
      ...fileInitialState,
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
    const result = fileReducer(fileInitialState, action);

    expect(result).toEqual({
      ...fileInitialState,
      result: action.data
    });
  });
});