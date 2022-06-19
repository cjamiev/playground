import {
  OPEN_GLOBAL_MODAL,
  CLOSE_GLOBAL_MODAL,
  SHOW_LOADING_MODAL,
  HIDE_LOADING_MODAL,
  OPEN_SIDE_PANEL,
  CLOSE_SIDE_PANEL
} from './globalActions';
import { isNumber } from 'utils/type-check';

export const globalInitialState = {
  modalQueue: [],
  loadingQueue: [],
  isSidePanelOpen: false
};

const globalReducer = (state = globalInitialState, action) => {
  const globalCases = {
    [OPEN_GLOBAL_MODAL]: () => {
      return {
        ...state,
        modalQueue: [
          ...state.modalQueue,
          {
            id: state.modalQueue.length,
            ...action.data
          }
        ]
      };
    },
    [CLOSE_GLOBAL_MODAL]: () => {
      const filteredModalQueue = isNumber(action.id) ? state.modalQueue.filter((item) => action.id !== item.id) : [];

      return {
        ...state,
        modalQueue: filteredModalQueue
      };
    },
    [SHOW_LOADING_MODAL]: () => {
      return {
        ...state,
        loadingQueue: [...state.loadingQueue, action.data]
      };
    },
    [HIDE_LOADING_MODAL]: () => {
      const filteredLoadingQueue = action.data ? state.loadingQueue.filter((item) => action.data !== item) : [];

      return {
        ...state,
        loadingQueue: filteredLoadingQueue
      };
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
