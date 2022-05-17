import { LOAD_CONFIG } from './configActions';

export const configInitialState = {
  commands: [],
  links: [],
  paste: []
};

const configReducer = (state = configInitialState, action) => {
  const configCases = {
    [LOAD_CONFIG]: () => {
      return {
        ...state,
        commands: action.data.commands,
        links: action.data.links,
        paste: action.data.paste
      };
    }
  };

  return configCases.hasOwnProperty(action.type) ? configCases[action.type]() : state;
};

export default configReducer;
