import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const LOAD_REMOTE_URL = 'LOAD_REMOTE_URL';
const LOAD_DELETE = 'LOAD_DELETE';
const LOAD_SELECT_BRANCH = 'LOAD_SELECT_BRANCH';
const LOAD_BRANCHES = 'LOAD_BRANCHES';
const LOAD_STASH = 'LOAD_STASH';
const LOAD_SELECT_STASH = 'LOAD_SELECT_STASH';
const LOAD_VIEW_STASH = 'LOAD_VIEW_STASH';
const LOAD_RESET = 'LOAD_RESET';
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
const ONE_SECOND = 1000;
const DEFAULT_DIR = './';

const getRemoteUrl = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/git/?type=remoteurl&root=${rootDir}`)
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
      .get(`/git/?type=delete&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: LOAD_DELETE, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const selectBranch = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/git/?type=select&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: LOAD_SELECT_BRANCH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const viewBranches = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/git/?type=view&root=${rootDir}`)
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
      .get(`/git/?type=stash&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: LOAD_STASH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const selectStash = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/git/?type=selectstash&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: LOAD_SELECT_STASH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const viewStash = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/git/?type=viewstash&root=${rootDir}`)
      .then((response) => {
        dispatch({ type: LOAD_VIEW_STASH, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const reset = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/git/?type=reset&root=${rootDir}`)
      .then((response) => {
        dispatch({ type: LOAD_RESET, message: response.data.message });
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
  LOAD_DELETE,
  deleteBranch,
  LOAD_SELECT_BRANCH,
  selectBranch,
  LOAD_BRANCHES,
  viewBranches,
  LOAD_STASH,
  createStash,
  LOAD_SELECT_STASH,
  selectStash,
  LOAD_VIEW_STASH,
  viewStash,
  LOAD_RESET,
  reset,
  CLEAR_MESSAGE,
  clearMessage
};
