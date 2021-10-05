import { LOAD_COMMAND_RESULT, EXECUTE_COMMAND_RESULT, ERROR_COMMAND_RESULT, CLEAR_COMMAND_RESULT } from './listActions';

export const listInitialState = {
  commandResponse: '',
  commands: []
};

const listReducer = (state = listInitialState, action) => {
  const listCases = {
    [LOAD_COMMAND_RESULT]: () => {
      return {
        ...state,
        commands: action.data
      };
    },
    [EXECUTE_COMMAND_RESULT]: () => {
      return {
        ...state,
        commandResponse: action.data
      };
    },
    [ERROR_COMMAND_RESULT]: () => {
      return {
        ...state,
        commandResponse: action.error
      };
    },
    [CLEAR_COMMAND_RESULT]: () => {
      return {
        ...state,
        commandResponse: ''
      };
    }
  };

  return listCases.hasOwnProperty(action.type) ? listCases[action.type]() : state;
};

export default listReducer;
