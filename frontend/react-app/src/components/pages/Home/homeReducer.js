import { LOAD_HOME } from './homeActions';

export const homeInitialState = {
  homeData: {}
};

const homeReducer = (state = homeInitialState, action) => {
  const homeCases = {
    [LOAD_HOME]: () => {
      return {
        ...state,
        homeData: action.data
      };
    }
  };

  return homeCases.hasOwnProperty(action.type) ? homeCases[action.type]() : state;
};

export default homeReducer;
