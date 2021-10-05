import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const LOAD_COMMAND_RESULT = 'LOAD_COMMAND_RESULT';
const EXECUTE_COMMAND_RESULT = 'EXECUTE_COMMAND_RESULT';
const ERROR_COMMAND_RESULT = 'ERROR_COMMAND_RESULT';
const CLEAR_COMMAND_RESULT = 'CLEAR_COMMAND_RESULT';

const loadCommand = () => {
  return (dispatch) => {
    api
      .get('/command')
      .then((response) => {
        dispatch({ type: LOAD_COMMAND_RESULT, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const executeCommand = (filename, args) => {
  return (dispatch) => {
    api
      .get(`/command?name=${filename}&args=${args}`)
      .then((response) => {
        dispatch({ type: EXECUTE_COMMAND_RESULT, data: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: ERROR_COMMAND_RESULT, error: error.message });
      });
  };
};

const clearCommand = () => ({ type: CLEAR_COMMAND_RESULT });

export {
  loadCommand,
  LOAD_COMMAND_RESULT,
  executeCommand,
  EXECUTE_COMMAND_RESULT,
  ERROR_COMMAND_RESULT,
  clearCommand,
  CLEAR_COMMAND_RESULT
};
