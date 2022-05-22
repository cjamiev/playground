import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const LOAD_SETTINGS = 'LOAD_SETTINGS';
const ONE_SECOND = 1000;

const loadSettings = () => {
  return (dispatch) => {
    api
      .get('/db/?name=config.json')
      .then((response) => {
        dispatch({ type: LOAD_SETTINGS, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updateSettings = (content) => {
  return (dispatch) => {
    api
      .post('/db', { filename: 'config.json', content: JSON.stringify(content) })
      .then((response) => {
        dispatch(createAlert({ content: 'Updated', timer: ONE_SECOND, status: 'success' }));
        dispatch({ type: LOAD_SETTINGS, data: content });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export { LOAD_SETTINGS, loadSettings, updateSettings };
