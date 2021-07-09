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
import mockserverReducer from './mockserverReducer';

const initialState = {
  config: {},
  mocks: [],
  logs: [],
  message: {},
  error: {}
};

describe('mockserverReducer', () => {
  it('default', () => {
    const result = mockserverReducer(undefined, {});

    expect(result).toEqual(initialState);
  });

  it('LOAD_MOCKSERVER_CONFIG', () => {
    const action = {
      type: LOAD_MOCKSERVER_CONFIG,
      data: {
        delay: 0,
        delayUrls: [],
        log: true,
        error: false,
        overrideUrls: [],
        overrideStatusCode: 200,
        overrideResponse: {}
      }
    };
    const result = mockserverReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      config: action.data
    });
  });

  it('UPDATE_MOCKSERVER_CONFIG', () => {
    const action = {
      type: UPDATE_MOCKSERVER_CONFIG,
      data: {
        error: false,
        message: 'Wrote to file:./storage/mock/config.json'
      }
    };
    const result = mockserverReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      message: action.data
    });
  });

  it('LOAD_MOCKREQUESTS', () => {
    const action = {
      type: LOAD_MOCKREQUESTS,
      data: [
        {url: '/test', method: 'POST', responsePath: './storage/mock/responses/test.json'}
      ]
    };
    const result = mockserverReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      mocks: action.data
    });
  });

  it('UPDATE_MOCKREQUESTS', () => {
    const action = {
      type: UPDATE_MOCKREQUESTS,
      data: {
        error: false,
        message: 'Wrote to file:./storage/mock/responses/test.json'
      }
    };
    const result = mockserverReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      message: action.data
    });
  });

  it('CREATE_MOCK_ENDPOINT', () => {
    const action = {
      type: CREATE_MOCK_ENDPOINT,
      data: {
        error: false,
        message: 'Wrote to file:./storage/mock/responses/test.json'
      }
    };
    const result = mockserverReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      message: action.data
    });
  });

  it('UPDATE_MOCK_ENDPOINT', () => {
    const action = {
      type: UPDATE_MOCK_ENDPOINT,
      data: {
        error: false,
        message: 'Wrote to file:./storage/mock/responses/test.json'
      }
    };
    const result = mockserverReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      message: action.data
    });
  });

  it('LOAD_MOCKSERVER_LOG', () => {
    const action = {
      type: LOAD_MOCKSERVER_LOG,
      data: {
        error: false,
        data: [
          {
            timestamp: '7/8/2021 21:20:23',
            url: '/api/test',
            payload: {}
          }
        ]
      }
    };
    const result = mockserverReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      log: action.data
    });
  });

  it('CLEAR_MOCKSERVER_LOG', () => {
    const action = {
      type: CLEAR_MOCKSERVER_LOG,
      data: {
        error: false,
        message: {
          'error': false,
          'message': 'Wrote to file:./storage/mock/log.json'
        }
      }
    };
    const result = mockserverReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      log: [],
      message: action.data
    });
  });

  it('ERROR_MOCKSERVER', () => {
    const action = {
      type: ERROR_MOCKSERVER,
      error: {
        message: 'Wrote to file:./storage/mock/log.json'
      }
    };
    const result = mockserverReducer(initialState, action);

    expect(result).toEqual({
      ...initialState,
      error: action.error
    });
  });
});