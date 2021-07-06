import {
  OPEN_GLOBAL_MODAL,
  CLOSE_GLOBAL_MODAL,
  SHOW_LOADING_MODAL,
  HIDE_LOADING_MODAL
} from './globalModalActions';
import { isNumber } from 'type-check';

export const globalModalInitialState = {
  modalQueue: [],
  isLoading: false
};

const modalReducer = (state = globalModalInitialState, action) => {
  const modalCases = {
    [OPEN_GLOBAL_MODAL]: () => {
      return {
        ...state,
        modalQueue: [...state.modalQueue, {
          id: state.modalQueue.length,
          title: action.data.title,
          message: action.data.message,
          action: action.data.action
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
    }
  };

  return modalCases.hasOwnProperty(action.type) ? modalCases[action.type]() : state;
};

export default modalReducer;
