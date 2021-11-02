import api from 'api';
import { createAlert } from 'components/alert/alertActions';
import { showLoadingModal, hideLoadingModal } from 'components/global/globalActions';

const LOAD_DIRECTORY = 'LOAD_DIRECTORY';
const LOAD_FILE = 'LOAD_FILE';

const ONE_SECOND = 1000;

const loadDirectory = () => {
  return (dispatch) => {
    api
      .get('/file')
      .then((response) => {
        dispatch({ type: LOAD_DIRECTORY, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const loadFile = (filename) => {
  return (dispatch) => {
    dispatch(showLoadingModal(`File ${filename}`));
    api
      .get(`/file/?name=${filename}`)
      .then((response) => {
        dispatch({ type: LOAD_FILE, data: response.data.data });
        dispatch(hideLoadingModal(`File ${filename}`));
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const writeFile = (filename, content) => {
  return (dispatch) => {
    api
      .post('/file', { filename, content })
      .then((response) => {
        dispatch(createAlert({ content: 'Updated', timer: ONE_SECOND, status: 'success' }));
        dispatch(loadDirectory());
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export { LOAD_DIRECTORY, loadDirectory, LOAD_FILE, loadFile, writeFile };
