import {
  UPDATE_GLOBAL_TIMER,
  INITIALIZE_TIMER,
  OPEN_GLOBAL_MODAL,
  CLOSE_GLOBAL_MODAL,
  SHOW_LOADING_MODAL,
  HIDE_LOADING_MODAL,
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL
} from './globalActions';
import { isNumber } from 'type-check';

export const globalInitialState = {
  timers: [],
  initialized: false,
  modalQueue: [],
  isLoading: false,
  isSidePanelOpen: false
};

const globalReducer = (state = globalInitialState, action) => {
  const globalCases = {
    [UPDATE_GLOBAL_TIMER]: () => {
      localStorage.setItem('globaltimers', JSON.stringify(action.data));

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
    },
    [OPEN_GLOBAL_MODAL]: () => {
      return {
        ...state,
        modalQueue: [...state.modalQueue, {
          id: state.modalQueue.length,
          ...action.data
        }]
      };
    },
    [CLOSE_GLOBAL_MODAL]: () => {
      const filteredModalQueue = isNumber(action.id) ? state.modalQueue.filter(item => action.id !== item.id) : [];

      return {
        ...state,
        modalQueue: filteredModalQueue
      };
    },
    [SHOW_LOADING_MODAL]: () => {
      return { ...state, isLoading: true };
    },
    [HIDE_LOADING_MODAL]: () => {
      return { ...state, isLoading: false };
    },
    [OPEN_SIDE_PANEL]: () => {
      return { ...state, isSidePanelOpen: true };
    },
    [CLOSE_SIDE_PANEL]: () => {
      return { ...state, isSidePanelOpen: false };
    }
  };

  return globalCases.hasOwnProperty(action.type) ? globalCases[action.type]() : state;
};

export default globalReducer;
