import api from 'api';

const LOAD_MOCKSERVER_CONFIG = 'LOAD_MOCKSERVER_CONFIG';
const UPDATE_MOCKSERVER_CONFIG = 'UPDATE_MOCKSERVER_CONFIG';
const LOAD_MOCKREQUESTS = 'LOAD_MOCKREQUESTS';
const UPDATE_MOCKREQUESTS = 'UPDATE_MOCKREQUESTS';
const DELETE_MOCK_ENDPOINT = 'DELETE_MOCK_ENDPOINT';
const LOAD_MOCK_RESPONSE = 'LOAD_MOCK_RESPONSE';
const UPDATE_MOCK_RESPONSE = 'UPDATE_MOCK_RESPONSE';
const CREATE_MOCK_ENDPOINT = 'CREATE_MOCK_ENDPOINT';
const UPDATE_MOCK_ENDPOINT = 'UPDATE_MOCK_ENDPOINT';
const LOAD_MOCKSERVER_LOG = 'LOAD_MOCKSERVER_LOG';
const CLEAR_MOCKSERVER_LOG = 'CLEAR_MOCKSERVER_LOG';
const ERROR_MOCKSERVER = 'ERROR_MOCKSERVER';

const loadMockServerConfig = () => {
  return (dispatch) => {
    api
      .get('/api/mockserver/config')
      .then((response) => {
        dispatch({ type: LOAD_MOCKSERVER_CONFIG, data: response.data.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const updateMockServerConfig = (payload) => {
  return (dispatch) => {
    api
      .post('/api/mockserver/config', JSON.stringify(payload))
      .then((response) => {
        dispatch({ type: UPDATE_MOCKSERVER_CONFIG, data: response.data.message, payload });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const loadMockRequests = () => {
  return (dispatch) => {
    api
      .get('api/mockserver/mockRequests')
      .then((response) => {
        dispatch({ type: LOAD_MOCKREQUESTS, data: response.data.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const updateMockRequests = () => {
  return (dispatch) => {
    api
      .post('/api/mockserver/mockRequests')
      .then((response) => {
        dispatch({ type: UPDATE_MOCKREQUESTS, data: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const deleteMockEndpoint = (endpoint) => {
  return (dispatch) => {
    api
      .post('/api/mockserver/deleteMockEndpoint', endpoint)
      .then((response) => {
        dispatch({ type: DELETE_MOCK_ENDPOINT, data: response.data.message, endpoint });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const loadMockResponse = (payload) => {
  return (dispatch) => {
    api
      .post('api/mockserver/loadMockResponse', JSON.stringify(payload))
      .then((response) => {
        dispatch({ type: LOAD_MOCK_RESPONSE, data: response.data.data, payload });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const updateMockResponse = (payload) => {
  return (dispatch) => {
    api
      .post('api/mockserver/updateMockEndpoint', payload)
      .then((response) => {
        dispatch({ type: UPDATE_MOCK_RESPONSE, data: response.data.message, payload });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const createMockEndpoint = (payload) => {
  return (dispatch) => {
    api
      .post('/api/mockserver/createMockEndpoint', JSON.stringify(payload))
      .then((response) => {
        dispatch({ type: CREATE_MOCK_ENDPOINT, data: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const updateMockEndpoint = () => {
  return (dispatch) => {
    api
      .post('/api/mockserver/updateMockEndpoint')
      .then((response) => {
        dispatch({ type: UPDATE_MOCK_ENDPOINT, data: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const loadMockServerLog = () => {
  return (dispatch) => {
    api
      .get('api/mockserver/loadLog')
      .then((response) => {
        dispatch({ type: LOAD_MOCKSERVER_LOG, data: response.data.data });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

const clearMockServerLog = () => {
  return (dispatch) => {
    api
      .get('api/mockserver/clearLog')
      .then((response) => {
        dispatch({ type: CLEAR_MOCKSERVER_LOG, data: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: ERROR_MOCKSERVER, error });
      });
  };
};

export {
  LOAD_MOCKSERVER_CONFIG,
  UPDATE_MOCKSERVER_CONFIG,
  LOAD_MOCKREQUESTS,
  UPDATE_MOCKREQUESTS,
  DELETE_MOCK_ENDPOINT,
  LOAD_MOCK_RESPONSE,
  UPDATE_MOCK_RESPONSE,
  CREATE_MOCK_ENDPOINT,
  UPDATE_MOCK_ENDPOINT,
  LOAD_MOCKSERVER_LOG,
  CLEAR_MOCKSERVER_LOG,
  ERROR_MOCKSERVER,
  loadMockServerConfig,
  updateMockServerConfig,
  loadMockRequests,
  updateMockRequests,
  deleteMockEndpoint,
  loadMockResponse,
  updateMockResponse,
  createMockEndpoint,
  updateMockEndpoint,
  loadMockServerLog,
  clearMockServerLog
};
