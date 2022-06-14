import api from 'api';
import { createAlert } from 'components/atoms/Alert/alertActions';

const LOAD_MOCKSERVER_SETTINGS = 'LOAD_MOCKSERVER_SETTINGS';
const UPDATE_MOCKSERVER_SETTINGS = 'UPDATE_MOCKSERVER_SETTINGS';
const LOAD_MOCKREQUESTS = 'LOAD_MOCKREQUESTS';
const DELETE_MOCK_ENDPOINT = 'DELETE_MOCK_ENDPOINT';
const LOAD_MOCK_RESPONSE = 'LOAD_MOCK_RESPONSE';
const LOAD_MOCKSERVER_LOG = 'LOAD_MOCKSERVER_LOG';
const CLEAR_MOCKSERVER_LOG = 'CLEAR_MOCKSERVER_LOG';
const CLEAR_MOCK_RESPONSE = 'CLEAR_MOCK_RESPONSE';

const THREE_SECOND = 3000;

const loadMockServerConfig = () => {
  return (dispatch) => {
    api
      .get('/mockserver/config')
      .then((response) => {
        dispatch({ type: LOAD_MOCKSERVER_SETTINGS, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updateMockServerConfig = (payload) => {
  return (dispatch) => {
    api
      .post('/mockserver/config', JSON.stringify(payload))
      .then((response) => {
        const { message, error } = response.data;
        dispatch({ type: UPDATE_MOCKSERVER_SETTINGS, payload });
        dispatch(
          createAlert({
            content: error ? message : 'Updated',
            timer: error ? undefined : THREE_SECOND,
            status: error ? 'error' : 'success'
          })
        );
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const loadMockRequests = () => {
  return (dispatch) => {
    api
      .get('mockserver/mockRequests')
      .then((response) => {
        dispatch({ type: LOAD_MOCKREQUESTS, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updateMockRequests = () => {
  return (dispatch) => {
    api
      .post('/mockserver/mockRequests')
      .then((response) => {
        const { message, error } = response.data;
        dispatch(
          createAlert({
            content: error ? message : 'Updated',
            timer: error ? undefined : THREE_SECOND,
            status: error ? 'error' : 'success'
          })
        );
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const deleteMockEndpoint = (endpoint) => {
  return (dispatch) => {
    api
      .post('/mockserver/deleteMockEndpoint', endpoint)
      .then((response) => {
        const { message, error } = response.data;
        dispatch({ type: DELETE_MOCK_ENDPOINT, endpoint });
        dispatch(
          createAlert({
            content: error ? message : 'Updated',
            timer: error ? undefined : THREE_SECOND,
            status: error ? 'error' : 'success'
          })
        );
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const loadMockResponse = (payload) => {
  return (dispatch) => {
    api
      .post('mockserver/loadMockResponse', JSON.stringify(payload))
      .then((response) => {
        dispatch({ type: LOAD_MOCK_RESPONSE, data: response.data.data, payload });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const updateMockResponse = (payload) => {
  return (dispatch) => {
    api
      .post('mockserver/updateMockEndpoint', payload)
      .then((response) => {
        const { message, error } = response.data;
        dispatch(
          createAlert({
            content: error ? message : 'Updated',
            timer: error ? undefined : THREE_SECOND,
            status: error ? 'error' : 'success'
          })
        );
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const clearMockResponse = () => ({ type: CLEAR_MOCK_RESPONSE });

const createMockEndpoint = (payload) => {
  return (dispatch) => {
    api
      .post('/mockserver/createMockEndpoint', JSON.stringify(payload))
      .then((response) => {
        const { message, error } = response.data;
        dispatch(
          createAlert({
            content: error ? message : 'Updated',
            timer: error ? undefined : THREE_SECOND,
            status: error ? 'error' : 'success'
          })
        );
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const loadMockServerLog = () => {
  return (dispatch) => {
    api
      .get('mockserver/loadLog')
      .then((response) => {
        dispatch({ type: LOAD_MOCKSERVER_LOG, data: response.data.data });
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

const clearMockServerLog = () => {
  return (dispatch) => {
    api
      .get('mockserver/clearLog')
      .then((response) => {
        const { message, error } = response.data;
        dispatch({ type: CLEAR_MOCKSERVER_LOG });
        dispatch(
          createAlert({
            content: error ? message : 'Updated',
            timer: error ? undefined : THREE_SECOND,
            status: error ? 'error' : 'success'
          })
        );
      })
      .catch((error) => {
        dispatch(createAlert({ content: error.message, status: 'error' }));
      });
  };
};

export {
  LOAD_MOCKSERVER_SETTINGS,
  UPDATE_MOCKSERVER_SETTINGS,
  LOAD_MOCKREQUESTS,
  DELETE_MOCK_ENDPOINT,
  LOAD_MOCK_RESPONSE,
  LOAD_MOCKSERVER_LOG,
  CLEAR_MOCKSERVER_LOG,
  CLEAR_MOCK_RESPONSE,
  loadMockServerConfig,
  updateMockServerConfig,
  loadMockRequests,
  updateMockRequests,
  deleteMockEndpoint,
  loadMockResponse,
  updateMockResponse,
  createMockEndpoint,
  loadMockServerLog,
  clearMockServerLog,
  clearMockResponse
};
