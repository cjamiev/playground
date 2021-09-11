import {
  UPDATE_GLOBAL_TIMER,
  INITIALIZE_TIMER
} from './globalActions';

export const globalInitialState = {
  timers: [],
  initialized: false
};

const globalReducer = (state = globalInitialState, action) => {
  const globalCases = {
    [UPDATE_GLOBAL_TIMER]: () => {
      return {
        ...state,
        timers: action.data
      };
    },
    [INITIALIZE_TIMER]: () => {
      const globaltimers = localStorage.getItem('globaltimers') || '[]';

      return {
        ...state,
        initialized: true,
        timers: JSON.parse(globaltimers)
      };
    }
  };

  return globalCases.hasOwnProperty(action.type) ? globalCases[action.type]() : state;
};

export default globalReducer;
