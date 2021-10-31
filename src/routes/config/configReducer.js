import { LOAD_CONFIG } from './configActions';

export const configInitialState = {
  commands: [],
  links: []
};

const configReducer = (state = configInitialState, action) => {
  const configCases = {
    [LOAD_CONFIG]: () => {
      return {
        ...state,
        commands: action.data.commands,
        links: action.data.links
      };
    }
  };

  return configCases.hasOwnProperty(action.type) ? configCases[action.type]() : state;
};

export default configReducer;
