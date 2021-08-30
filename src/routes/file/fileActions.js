import api from 'api';

const LOAD_DIRECTORY = 'LOAD_DIRECTORY';
const ERROR_DIRECTORY = 'ERROR_DIRECTORY';
const LOAD_FILE = 'LOAD_FILE';
const ERROR_FILE = 'ERROR_FILE';
const WRITE_FILE = 'WRITE_FILE';

const loadDirectory = () => {
  return (dispatch) => {
    api
      .get('/read')
      .then((response) => {
        dispatch({ type: LOAD_DIRECTORY, data: response.data.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_DIRECTORY, error });
      });
  };
};

const loadFile = (filename) => {
  return (dispatch) => {
    api
      .get(`/read/?name=${filename}`)
      .then((response) => {
        dispatch({ type: LOAD_FILE, data: response.data.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_FILE, error });
      });
  };
};

const writeFile = (filename, content) => {
  return (dispatch) => {
    api
      .post('/write', { filename, content })
      .then((response) => {
        dispatch({ type: WRITE_FILE, data: response.data.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_FILE, error });
      });
  };
};

export {
  LOAD_DIRECTORY,
  ERROR_DIRECTORY,
  loadDirectory,
  LOAD_FILE,
  ERROR_FILE,
  loadFile,
  WRITE_FILE,
  writeFile
};
