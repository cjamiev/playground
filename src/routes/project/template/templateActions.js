import api from 'api';
import { createAlert } from 'components/alert/alertActions';
import { showLoadingModal, hideLoadingModal } from 'components/global/globalActions';

const CREATE_FILES_FROM_TEMPLATES = 'CREATE_FILES_FROM_TEMPLATES';
const LOAD_TEMPLATES = 'LOAD_TEMPLATES';
const ONE_SECOND = 1000;

const loadTemplates = () => {
  return (dispatch) => {
    dispatch(showLoadingModal('Templates'));
    api
      .get('/project/?type=template&op=read')
      .then((response) => {
        dispatch({ type: LOAD_TEMPLATES, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      })
      .finally(() => {
        dispatch(hideLoadingModal('Templates'));
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

const createTemplate = (filename, content) => {
  return (dispatch) => {
    api
      .post(`/project/?type=template&op=write&name=${filename}`, JSON.stringify(content))
      .then((response) => {
        dispatch(createAlert({ content: `Created ${filename}`, timer: ONE_SECOND, status: 'success' }));
        dispatch(loadTemplates());
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
  createFilesFromTemplates,
  createTemplate
};
