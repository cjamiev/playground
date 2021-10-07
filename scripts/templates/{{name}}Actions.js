import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const LOAD_{{NAME}} = 'LOAD_{{NAME}}';
const ONE_SECOND = 1000;

const load{{Name}} = () => {
  return (dispatch) => {
    api
      .get('/db/?name={{name}}.json')
      .then((response) => {
        dispatch({ type: LOAD_{{NAME}}, data: JSON.parse(response.data.data) });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const update{{Name}} = (content) => {
  return (dispatch) => {
    api
      .post('/db', { filename: '{{name}}.json', content: JSON.stringify(content) })
      .then((response) => {
        dispatch(createAlert({ content: 'Updated', timer: ONE_SECOND, status: 'success' }));
        dispatch({ type: LOAD_{{NAME}}, data: content });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export {
  LOAD_{{NAME}},
  load{{Name}},
  update{{Name}}
};
