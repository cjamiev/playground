import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const LOAD_REMOTE_URL = 'LOAD_REMOTE_URL';
const DELETE_BRANCH = 'DELETE_BRANCH';
const SELECT_BRANCH = 'SELECT_BRANCH';
const LOAD_BRANCHES = 'LOAD_BRANCHES';
const CREATE_STASH = 'CREATE_STASH';
const SELECT_STASH = 'SELECT_STASH';
const LOAD_VIEW_STASH = 'LOAD_VIEW_STASH';
const RESET_BRANCH = 'RESET_BRANCH';
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
const ONE_SECOND = 1000;
const DEFAULT_DIR = './';

const getRemoteUrl = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/project/?type=remoteurl&root=${rootDir}`)
      .then((response) => {
        dispatch({ type: LOAD_REMOTE_URL, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const deleteBranch = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=deletebranch&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: DELETE_BRANCH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const selectBranch = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=selectbranch&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: SELECT_BRANCH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const viewBranches = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/project/?type=viewbranches&root=${rootDir}`)
      .then((response) => {
        dispatch({ type: LOAD_BRANCHES, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const createStash = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=createstash&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: CREATE_STASH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const selectStash = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=selectstash&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: SELECT_STASH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const viewStash = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/project/?type=viewstash&root=${rootDir}`)
      .then((response) => {
        dispatch({ type: LOAD_VIEW_STASH, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const resetBranch = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/project/?type=resetbranch&root=${rootDir}`)
      .then((response) => {
        dispatch({ type: RESET_BRANCH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const clearMessage = () => ({ type: CLEAR_MESSAGE });

export {
  LOAD_REMOTE_URL,
  getRemoteUrl,
  DELETE_BRANCH,
  deleteBranch,
  SELECT_BRANCH,
  selectBranch,
  LOAD_BRANCHES,
  viewBranches,
  CREATE_STASH,
  createStash,
  SELECT_STASH,
  selectStash,
  LOAD_VIEW_STASH,
  viewStash,
  RESET_BRANCH,
  resetBranch,
  CLEAR_MESSAGE,
  clearMessage
};