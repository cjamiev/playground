import api from 'api';
import { createAlert } from 'components/alert/alertActions';
import { showLoadingModal, hideLoadingModal } from 'components/global/globalActions';

const CREATE_FILES_FROM_TEMPLATES = 'CREATE_FILES_FROM_TEMPLATES';
const LOAD_TEMPLATE_DIRECTORY = 'LOAD_TEMPLATE_DIRECTORY';
const LOAD_TEMPLATE = 'LOAD_TEMPLATE';
const ONE_SECOND = 1000;

const loadTemplateDirectory = () => {
  return (dispatch) => {
    dispatch(showLoadingModal('Templates'));
    api
      .get('/project/?type=template&op=read')
      .then((response) => {
        dispatch({ type: LOAD_TEMPLATE_DIRECTORY, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `loadTemplateDirectory: ${error.message}`, status: 'error' }));
      })
      .finally(() => {
        dispatch(hideLoadingModal('Templates'));
      });
  };
};

const loadTemplate = (name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=template&op=read&name=${name}`)
      .then((response) => {
        dispatch({ type: LOAD_TEMPLATE, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: `loadTemplate: ${error.message}`, status: 'error' }));
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
        dispatch(createAlert({ content: `createFilesFromTemplates: ${error.message}`, status: 'error' }));
      });
  };
};

const createTemplate = (filename, content) => {
  return (dispatch) => {
    api
      .post(`/project/?type=template&op=write&name=${filename}`, JSON.stringify(content))
      .then((response) => {
        dispatch(createAlert({ content: `Created ${filename}`, timer: ONE_SECOND, status: 'success' }));
        dispatch(loadTemplateDirectory());
      })
      .catch((error) => {
        dispatch(createAlert({ content: `createTemplate: ${error.message}`, status: 'error' }));
      });
  };
};

export {
  LOAD_TEMPLATE_DIRECTORY,
  loadTemplateDirectory,
  LOAD_TEMPLATE,
  loadTemplate,
  CREATE_FILES_FROM_TEMPLATES,
  createFilesFromTemplates,
  createTemplate
};
