import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const CREATE_FILES_FROM_TEMPLATES = 'CREATE_FILES_FROM_TEMPLATES';
const LOAD_TEMPLATES = 'LOAD_TEMPLATES';

const loadTemplates = () => {
  return (dispatch) => {
    api
      .get('/project/?type=template&op=read')
      .then((response) => {
        dispatch({ type: LOAD_TEMPLATES, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const createFilesFromTemplates = (rootDir, name, content) => {
  return (dispatch) => {
    api
      .post(`/project/?type=template&op=create&root=${rootDir}&name=${name}`, JSON.stringify(content))
      .then((response) => {
        dispatch({ type: CREATE_FILES_FROM_TEMPLATES, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export {
  LOAD_TEMPLATES,
  loadTemplates,
  CREATE_FILES_FROM_TEMPLATES,
  createFilesFromTemplates
};
