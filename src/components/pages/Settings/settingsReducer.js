import { LOAD_SETTINGS } from './settingsActions';

export const settingsInitialState = {
  data: {}
};

const settingsReducer = (state = settingsInitialState, action) => {
  const settingsCases = {
    [LOAD_SETTINGS]: () => {
      return {
        ...state,
        data: action.data.commands
      };
    }
  };

  return settingsCases.hasOwnProperty(action.type) ? settingsCases[action.type]() : state;
};

export default settingsReducer;
