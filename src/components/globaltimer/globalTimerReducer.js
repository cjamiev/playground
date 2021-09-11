import {
  UPDATE_GLOBAL_TIMER,
  INITIALIZE_TIMER
} from './globalTimerActions';

export const globalTimerInitialState = {
  timers: [],
  initialized: false
};

const globalTimerReducer = (state = globalTimerInitialState, action) => {
  const globalTimerCases = {
    [UPDATE_GLOBAL_TIMER]: () => {
      return {
        ...state,
        timers: action.data
      };
    },
    [INITIALIZE_TIMER]: () => {
      const globalTimers = localStorage.getItem('globaltimers') || '[]';

      return {
        ...state,
        initialized: true,
        timers: JSON.parse(globalTimers)
      };
    }
  };

  return globalTimerCases.hasOwnProperty(action.type) ? globalTimerCases[action.type]() : state;
};

export default globalTimerReducer;
