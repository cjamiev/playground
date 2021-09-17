import api from 'api';

const LOAD_COMMAND_RESULT = 'LOAD_COMMAND_RESULT';
const ERROR_COMMAND_RESULT = 'ERROR_COMMAND_RESULT';
const CLEAR_COMMAND_RESULT = 'CLEAR_COMMAND_RESULT';

const executeCommand = (filename, args) => {
  return (dispatch) => {
    api
      .get(`/command?name=${filename}&args=${args}`)
      .then((response) => {
        dispatch({ type: LOAD_COMMAND_RESULT, data: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: ERROR_COMMAND_RESULT, error: error.message });
      });
  };
};

const clearCommand = () => ({ type: CLEAR_COMMAND_RESULT });

export {
  executeCommand,
  LOAD_COMMAND_RESULT,
  ERROR_COMMAND_RESULT,
  clearCommand,
  CLEAR_COMMAND_RESULT
};
