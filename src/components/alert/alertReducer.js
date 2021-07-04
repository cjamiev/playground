import {
  CREATE_ALERT,
  DISMISS_ALERT
} from './alertActions';
import { isNumber } from 'type-check';

const initialState = {
  queue: []
};

const alertReducer = (state = initialState, action) => {
  const alertCases = {
    [CREATE_ALERT]: () => {
      return {
        queue: [...state.queue, {
          id: state.queue.length,
          content: action.data.content,
          status: action.data.status
        }]
      };
    },
    [DISMISS_ALERT]: () => {
      const filteredQueue = isNumber(action.id) ? state.queue.filter(item => action.id !== item.id) : [];

      return {
        ...state,
        queue: filteredQueue
      };
    }
  };

  return alertCases.hasOwnProperty(action.type) ? alertCases[action.type]() : state;
};

export default alertReducer;