import {
  LOAD_DIRECTORY,
  LOAD_FILE
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
});