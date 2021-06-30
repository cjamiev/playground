import { LOAD_CLIPBOARD, ERROR_CLIPBOARD } from './clipboardActions';

const initialState = {
  value: [],
  error: {}
};

const clipboardReducer = (state = initialState, action) => {
  const clipboardCases = {
    [LOAD_CLIPBOARD]: () => {
      return {
        ...state,
        value: action.data
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
