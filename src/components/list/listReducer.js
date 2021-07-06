import {
  LOAD_COMMAND_RESULT,
  ERROR_COMMAND_RESULT
} from './listActions';

export const listInitialState = {
  commandResponse: ''
};

const listReducer = (state = listInitialState, action) => {
  const listCases = {
    [LOAD_COMMAND_RESULT]: () => {
      return {
        commandResponse: action.data
      };
    },
    [ERROR_COMMAND_RESULT]: () => {
      return {
        commandResponse: action.error
      };
    }
  };

  return listCases.hasOwnProperty(action.type) ? listCases[action.type]() : state;
};

export default listReducer;
