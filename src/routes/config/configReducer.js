import { LOAD_CONFIG } from './configActions';

export const configInitialState = {
  commands: []
};

const configReducer = (state = configInitialState, action) => {
  const configCases = {
    [LOAD_CONFIG]: () => {
      return {
        ...state,
        commands: action.data.commands
      };
    }
  };

  return configCases.hasOwnProperty(action.type) ? configCases[action.type]() : state;
};

export default configReducer;
