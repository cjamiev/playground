import { TEST_API_GET, TEST_API_POST } from './testApiActions';

const initialState = {};

const testApiReducer = (state = initialState, action) => {
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
