import api from '../../../api';
import { createAlert } from '../../layout/Alert/alertActions';

const GET_TODOS = 'GET_TODOS';
const IS_LOADING_TODOS = 'IS_LOADING_TODOS';
const THREE_SECOND = 3000;

const getTodos = () => {
  return (dispatch) => {
    dispatch({ type: IS_LOADING_TODOS });

    api
      .get('/file/?name=todos.json')
      .then((response) => {
        dispatch({ type: GET_TODOS, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updateTodos = (content) => {
  return (dispatch) => {
    api
      .post('/file', { filename: 'todos.json', content: JSON.stringify(content) })
      .then(() => {
        dispatch(createAlert({ content: 'Updated', timer: THREE_SECOND, status: 'success' }));
        dispatch({ type: GET_TODOS, data: content });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export { GET_TODOS, IS_LOADING_TODOS, getTodos, updateTodos };