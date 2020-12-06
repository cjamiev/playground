import { ADD_TEST, REMOVE_TEST } from './testActions';

const ONE = 1;
const initialState = [ONE];

const testReducer = (state = initialState, action) => {
  const testCases = {
    [ADD_TEST]: () => {
      return [...state, action.data];
    },
    [REMOVE_TEST]: () => {
      return state.filter((item) => item !== action.data);
    }
  };

  return testCases.hasOwnProperty(action.type) ? testCases[action.type]() : state;
};

export default testReducer;
