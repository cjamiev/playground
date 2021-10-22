import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const LOAD_PACKAGE = 'LOAD_PACKAGE';
const LOAD_VERSIONS = 'LOAD_VERSIONS';
const RUN_SCRIPT = 'RUN_SCRIPT';
const UPDATE_PACKAGE = 'UPDATE_PACKAGE';
const DEFAULT_DIR = './';

const getPackageJson = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/project/?type=package&op=read&root=${rootDir}`)
      .then((response) => {
        dispatch({ type: LOAD_PACKAGE, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const getDependencyVersions = (rootDir) => {
  return (dispatch) => {
    api
      .get(`/project/?type=package&op=getversions&root=${rootDir}`)
      .then((response) => {
        dispatch({ type: LOAD_VERSIONS, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const runNpmScript = (rootDir, content) => {
  return (dispatch) => {
    api
      .get(`/project/?type=package&op=runscript&root=${rootDir}&content=${content}`)
      .then((response) => {
        dispatch({ type: RUN_SCRIPT, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updatePackage = (rootDir, content) => {
  return (dispatch) => {
    api
      .post(`/project/?type=package&op=update&root=${rootDir}`, JSON.stringify(content))
      .then((response) => {
        dispatch({ type: UPDATE_PACKAGE, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export {
  LOAD_PACKAGE,
  getPackageJson,
  LOAD_VERSIONS,
  getDependencyVersions,
  RUN_SCRIPT,
  runNpmScript,
  UPDATE_PACKAGE,
  updatePackage
};
