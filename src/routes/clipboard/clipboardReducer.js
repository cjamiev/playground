import { LOAD_PASSWORD, ERROR_PASSWORD, LOAD_FOOD, ERROR_FOOD, LOAD_MAIN, ERROR_MAIN } from './clipboardActions';

export const clipboardInitialState = {
  passwords: [],
  food: [],
  main: [],
  error: {}
};

const clipboardReducer = (state = clipboardInitialState, action) => {
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
    },
    [LOAD_FOOD]: () => {
      return {
        ...state,
        food: action.data
      };
    },
    [ERROR_FOOD]: () => {
      return {
        ...state,
        error: action.error
      };
    },
    [LOAD_MAIN]: () => {
      return {
        ...state,
        main: action.data
      };
    },
    [ERROR_MAIN]: () => {
      return {
        ...state,
        error: action.error
      };
    }
  };

  return clipboardCases.hasOwnProperty(action.type) ? clipboardCases[action.type]() : state;
};

export default clipboardReducer;
