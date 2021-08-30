import {
  LOAD_DIRECTORY,
  ERROR_DIRECTORY,
  LOAD_FILE,
  ERROR_FILE,
  WRITE_FILE
} from './fileActions';

export const fileInitialState = {
  directory: [],
  file: '',
  error: {},
  result: {}
};

const fileReducer = (state = fileInitialState, action) => {
  const fileCases = {
    [LOAD_DIRECTORY]: () => {
      return {
        ...state,
        directory: action.data
      };
    },
    [ERROR_DIRECTORY]: () => {
      return {
        ...state,
        error: action.error
      };
    },
    [LOAD_FILE]: () => {
      return {
        ...state,
        file: action.data
      };
    },
    [ERROR_FILE]: () => {
      return {
        ...state,
        error: action.error
      };
    },
    [WRITE_FILE]: () => {
      return {
        ...state,
        result: action.data
      };
    }
  };

  return fileCases.hasOwnProperty(action.type) ? fileCases[action.type]() : state;
};

export default fileReducer;
