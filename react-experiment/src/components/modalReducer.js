import { OPEN_MODAL, CLOSE_MODAL } from './modalActions';

const initialState = {};

const testReducer = (state = initialState, action) => {
  const testCases = {
    [OPEN_MODAL]: () => {
      return {
        ...state,
        isOpen: true,
        title: action.data.title,
        message: action.data.message,
        action: action.data.action
      };
    },
    [CLOSE_MODAL]: () => {
      return { ...state, isOpen: false };
    }
  };

  return testCases.hasOwnProperty(action.type) ? testCases[action.type]() : state;
};

export default testReducer;
