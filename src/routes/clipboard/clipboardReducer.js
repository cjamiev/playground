import {
  LOAD_CLIPBOARD,
  ERROR_CLIPBOARD
} from './clipboardActions';

export const clipboardInitialState = {
  clipboard: {},
  error: {}
};

const clipboardReducer = (state = clipboardInitialState, action) => {
  const clipboardCases = {
    [LOAD_CLIPBOARD]: () => {
      return {
        ...state,
        clipboard: action.data
      };
    },
    [ERROR_CLIPBOARD]: () => {
      return {
        ...state,
        error: action.error
      };
    }
  };

  return clipboardCases.hasOwnProperty(action.type) ? clipboardCases[action.type]() : state;
};

export default clipboardReducer;
