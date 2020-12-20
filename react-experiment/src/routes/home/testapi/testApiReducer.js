import { TEST_GET, TEST_POST } from './testApiActions';

const initialState = {};

const testApiReducer = (state = initialState, action) => {
  const testApiCases = {
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

  return testApiCases.hasOwnProperty(action.type) ? testApiCases[action.type]() : state;
};

export default testApiReducer;
