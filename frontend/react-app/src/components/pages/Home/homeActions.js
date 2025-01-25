import api from '../../../api';
import { createAlert } from '../../layout/Alert/alertActions';

const LOAD_HOME = 'LOAD_HOME';
const THREE_SECOND = 3000;

const loadHome = () => {
  return (dispatch) => {
    api
      .get('/file/?name=home.json')
      .then((response) => {
        dispatch({ type: LOAD_HOME, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updateHome = (content) => {
  return (dispatch) => {
    api
      .post('/file', { filename: 'home.json', content: JSON.stringify(content) })
      .then((response) => {
        dispatch(createAlert({ content: 'Updated', timer: THREE_SECOND, status: 'success' }));
        dispatch({ type: LOAD_HOME, data: content });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export { LOAD_HOME, loadHome, updateHome };
