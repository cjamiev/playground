import api from 'api';
import { createAlert } from 'components/alert/alertActions';

const LOAD_REMOTE_URL = 'LOAD_REMOTE_URL';
const DELETE_BRANCH = 'DELETE_BRANCH';
const CREATE_BRANCH = 'CREATE_BRANCH';
const MERGE_BRANCH = 'MERGE_BRANCH';
const SELECT_BRANCH = 'SELECT_BRANCH';
const LOAD_BRANCHES = 'LOAD_BRANCHES';
const CREATE_STASH = 'CREATE_STASH';
const DELETE_STASH = 'DELETE_STASH';
const SELECT_STASH = 'SELECT_STASH';
const LOAD_VIEW_STASH = 'LOAD_VIEW_STASH';
const RESET_BRANCH = 'RESET_BRANCH';
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
const ONE_SECOND = 1000;
const DEFAULT_DIR = './';

const getRemoteUrl = (rootDir = DEFAULT_DIR) => {
  return (dispatch) => {
    api
      .get(`/project/?type=git&op=remoteurl&root=${rootDir}`)
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
      .get(`/project/?type=git&op=deletebranch&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: DELETE_BRANCH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const createBranch = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=git&op=createbranch&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: CREATE_BRANCH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const mergeBranch = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=git&op=mergebranch&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: MERGE_BRANCH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const selectBranch = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=git&op=selectbranch&root=${rootDir}&name=${name}`)
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
      .get(`/project/?type=git&op=viewbranches&root=${rootDir}`)
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
      .get(`/project/?type=git&op=createstash&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: CREATE_STASH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const deleteStash = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=git&op=deletestash&root=${rootDir}&name=${name}`)
      .then((response) => {
        dispatch({ type: DELETE_STASH, message: response.data.message });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const selectStash = (rootDir = DEFAULT_DIR, name) => {
  return (dispatch) => {
    api
      .get(`/project/?type=git&op=selectstash&root=${rootDir}&name=${name}`)
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
      .get(`/project/?type=git&op=viewstash&root=${rootDir}`)
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
      .get(`/project/?type=git&op=resetbranch&root=${rootDir}`)
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
  CREATE_BRANCH,
  createBranch,
  MERGE_BRANCH,
  mergeBranch,
  SELECT_BRANCH,
  selectBranch,
  LOAD_BRANCHES,
  viewBranches,
  CREATE_STASH,
  createStash,
  DELETE_STASH,
  deleteStash,
  SELECT_STASH,
  selectStash,
  LOAD_VIEW_STASH,
  viewStash,
  RESET_BRANCH,
  resetBranch,
  CLEAR_MESSAGE,
  clearMessage
};
