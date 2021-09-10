import {
  LOAD_HOME,
  ERROR_HOME
} from './homeActions';

export const homeInitialState = {
  home: {},
  error: {}
};

const homeReducer = (state = homeInitialState, action) => {
  const homeCases = {
    [LOAD_HOME]: () => {
      return {
        ...state,
        home: action.data
      };
    },
    [ERROR_HOME]: () => {
      return {
        ...state,
        error: action.error
      };
    }
  };

  return homeCases.hasOwnProperty(action.type) ? homeCases[action.type]() : state;
};

export default homeReducer;
