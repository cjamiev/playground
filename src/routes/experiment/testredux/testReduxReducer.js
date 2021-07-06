import { ADD_TEST, REMOVE_TEST } from './actions';

const ONE = 1;
export const testReduxInitialState = [ONE];

const testReduxReducer = (state = testReduxInitialState, action) => {
  const testCases = {
    [ADD_TEST]: () => {
      return [...state, action.data];
    },
    [REMOVE_TEST]: () => {
      return state.filter((item) => item !== Number(action.data));
    }
  };

  return testCases.hasOwnProperty(action.type) ? testCases[action.type]() : state;
};

export default testReduxReducer;