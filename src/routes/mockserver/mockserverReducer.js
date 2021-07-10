import {
  LOAD_MOCKSERVER_CONFIG,
  UPDATE_MOCKSERVER_CONFIG,
  LOAD_MOCKREQUESTS,
  UPDATE_MOCKREQUESTS,
  CREATE_MOCK_ENDPOINT,
  UPDATE_MOCK_ENDPOINT,
  LOAD_MOCKSERVER_LOG,
  CLEAR_MOCKSERVER_LOG,
  ERROR_MOCKSERVER
} from './mockserverActions';

export const mockserverInitialState = {
  config: {},
  mocks: [],
  log: [],
  message: {},
  error: {}
};

const mockserverReducer = (state = mockserverInitialState, action) => {
  const mockserverCases = {
    [LOAD_MOCKSERVER_CONFIG]: () => {
      return {
        ...state,
        config: action.data
      };
    },
    [UPDATE_MOCKSERVER_CONFIG]: () => {
      return {
        ...state,
        message: action.data,
        config: action.payload
      };
    },
    [LOAD_MOCKREQUESTS]: () => {
      return {
        ...state,
        mocks: action.data
      };
    },
    [UPDATE_MOCKREQUESTS]: () => {
      return {
        ...state,
        message: action.data
      };
    },
    [CREATE_MOCK_ENDPOINT]: () => {
      return {
        ...state,
        message: action.data
      };
    },
    [UPDATE_MOCK_ENDPOINT]: () => {
      return {
        ...state,
        message: action.data
      };
    },
    [LOAD_MOCKSERVER_LOG]: () => {
      return {
        ...state,
        log: action.data
      };
    },
    [CLEAR_MOCKSERVER_LOG]: () => {
      return {
        ...state,
        message: action.data,
        log: []
      };
    },
    [ERROR_MOCKSERVER]: () => {
      return {
        ...state,
        error: action.error
      };
    }
  };

  return mockserverCases.hasOwnProperty(action.type) ? mockserverCases[action.type]() : state;
};

export default mockserverReducer;
