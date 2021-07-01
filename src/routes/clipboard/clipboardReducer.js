import { LOAD_PASSWORD, ERROR_PASSWORD } from './clipboardActions';

const initialState = {
  passwords: [],
  error: {}
};

const clipboardReducer = (state = initialState, action) => {
  const clipboardCases = {
    [LOAD_PASSWORD]: () => {
      return {
        ...state,
        passwords: action.data
      };
    },
    [ERROR_PASSWORD]: () => {
      return {
        ...state,
        error: action.error
      };
    }
  };

  return clipboardCases.hasOwnProperty(action.type) ? clipboardCases[action.type]() : state;
};

export default clipboardReducer;
