import {
  LOAD_CLIPBOARD
} from './clipboardActions';

export const clipboardInitialState = {
  clipboard: {}
};

const clipboardReducer = (state = clipboardInitialState, action) => {
  const clipboardCases = {
    [LOAD_CLIPBOARD]: () => {
      return {
        ...state,
        clipboard: action.data
      };
    }
  };

  return clipboardCases.hasOwnProperty(action.type) ? clipboardCases[action.type]() : state;
};

export default clipboardReducer;
