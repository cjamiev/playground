import {
  LOAD_MOCKSERVER_CONFIG,
  UPDATE_MOCKSERVER_CONFIG,
  LOAD_MOCKREQUESTS,
  DELETE_MOCK_ENDPOINT,
  LOAD_MOCK_RESPONSE,
  CLEAR_MOCK_RESPONSE,
  LOAD_MOCKSERVER_LOG,
  CLEAR_MOCKSERVER_LOG
} from './mockserverActions';

export const mockserverInitialState = {
  config: {},
  mocks: [],
  log: [],
  mockResponse: undefined
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
        config: action.payload
      };
    },
    [LOAD_MOCKREQUESTS]: () => {
      return {
        ...state,
        mocks: action.data
      };
    },
    [DELETE_MOCK_ENDPOINT]: () => {
      return {
        ...state,
        mocks: state.mocks.filter(
          (item) => !(item.method === action.endpoint.method && item.url === action.endpoint.url)
        )
      };
    },
    [LOAD_MOCK_RESPONSE]: () => {
      return {
        ...state,
        mockResponse: {
          request: action.payload,
          response: action.data
        }
      };
    },
    [CLEAR_MOCK_RESPONSE]: () => {
      return {
        ...state,
        mockResponse: undefined
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
        log: []
      };
    }
  };

  return mockserverCases.hasOwnProperty(action.type) ? mockserverCases[action.type]() : state;
};

export default mockserverReducer;
