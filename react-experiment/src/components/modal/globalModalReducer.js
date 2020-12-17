import {
  OPEN_GLOBAL_MODAL,
  CLOSE_GLOBAL_MODAL,
  SHOW_LOADING_MODAL,
  HIDE_LOADING_MODAL
} from './globalModalActions';

const initialState = {};

const modalReducer = (state = initialState, action) => {
  const modalCases = {
    [OPEN_GLOBAL_MODAL]: () => {
      return {
        ...state,
        isOpen: true,
        title: action.data.title,
        message: action.data.message,
        action: action.data.action
      };
    },
    [CLOSE_GLOBAL_MODAL]: () => {
      return { ...state, isOpen: false };
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
