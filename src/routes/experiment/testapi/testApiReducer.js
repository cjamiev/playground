import { TEST_API_GET, TEST_API_POST } from './testApiActions';

export const testApiInitialState = {};

const testApiReducer = (state = testApiInitialState, action) => {
  const testApiCases = {
    [TEST_API_GET]: () => {
      return {
        ...state,
        value: action.data
      };
    },
    [TEST_API_POST]: () => {
      return {
        ...state,
        value: action.data
      };
    }
  };

  return testApiCases.hasOwnProperty(action.type) ? testApiCases[action.type]() : state;
};

export default testApiReducer;
