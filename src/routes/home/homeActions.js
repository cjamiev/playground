import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const LOAD_HOME = 'LOAD_HOME';
const ERROR_HOME = 'ERROR_HOME';

const ZERO = 0;

const loadHome = () => {
  return (dispatch) => {
    api
      .get('/db/?name=home.json')
      .then((response) => {
        dispatch({ type: LOAD_HOME, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch({ type: ERROR_HOME, error });
      });
  };
};

const updateHome = (content) => {
  return (dispatch) => {
    api
      .post('/db', { filename: 'clipboard.json', content: JSON.stringify(content) })
      .then((response) => {
        dispatch(createAlert({ content: response.data.message, status: 'success' }));
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export {
  LOAD_HOME,
  ERROR_HOME,
  loadHome,
  updateHome
};
