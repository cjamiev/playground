import { EXPERIMENT_GET, EXPERIMENT_POST } from './experimentActions';

export const experimentInitialState = {};

const experimentReducer = (state = experimentInitialState, action) => {
  const experimentCases = {
    [EXPERIMENT_GET]: () => {
      return {
        ...state,
        value: action.data
      };
    },
    [EXPERIMENT_POST]: () => {
      return {
        ...state,
        value: action.data
      };
    }
  };

  return experimentCases.hasOwnProperty(action.type) ? experimentCases[action.type]() : state;
};

export default experimentReducer;
