import { LOAD_CONFIG } from './configActions';

export const configInitialState = {
  data: []
};

const configReducer = (state = configInitialState, action) => {
  const configCases = {
    [LOAD_CONFIG]: () => {
      return {
        ...state,
        data: action.data
      };
    }
  };

  return configCases.hasOwnProperty(action.type) ? configCases[action.type]() : state;
};

export default configReducer;
