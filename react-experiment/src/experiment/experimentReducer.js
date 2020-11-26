import { TEST_GET, TEST_POST } from './experimentActions';

const initialState = {};

const experimentReducer = (state = initialState, action) => {
  const experimentCases = {
    [TEST_GET]: () => {
      return {
        ...state,
        value: action.data
      };
    },
    [TEST_POST]: () => {
      return {
        ...state,
        value: action.data
      };
    }
  };

  return experimentCases.hasOwnProperty(action.type) ? experimentCases[action.type]() : state;
};

export default experimentReducer;
