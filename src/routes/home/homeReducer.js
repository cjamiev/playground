import {
  LOAD_DIRECTORY,
  ERROR_DIRECTORY,
  LOAD_FILE,
  ERROR_FILE,
  WRITE_FILE
} from './homeActions';

export const homeInitialState = {
  directory: [],
  file: '',
  error: {},
  result: {}
};

const homeReducer = (state = homeInitialState, action) => {
  const homeCases = {
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

  return homeCases.hasOwnProperty(action.type) ? homeCases[action.type]() : state;
};

export default homeReducer;
