import {
  LOAD_DIRECTORY,
  LOAD_FILE
} from './fileActions';

export const fileInitialState = {
  directory: [],
  file: ''
};

const fileReducer = (state = fileInitialState, action) => {
  const fileCases = {
    [LOAD_DIRECTORY]: () => {
      return {
        ...state,
        directory: action.data
      };
    },
    [LOAD_FILE]: () => {
      return {
        ...state,
        file: action.data
      };
    }
  };

  return fileCases.hasOwnProperty(action.type) ? fileCases[action.type]() : state;
};

export default fileReducer;
