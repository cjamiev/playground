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
import mockserverReducer, { mockserverInitialState } from './mockserverReducer';

describe('mockserverReducer', () => {
  it('default', () => {
    const result = mockserverReducer(undefined, {});

    expect(result).toEqual(mockserverInitialState);
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
    const result = mockserverReducer(mockserverInitialState, action);

    expect(result).toEqual({
      ...mockserverInitialState,
      config: action.data
    });
  });

  it('UPDATE_MOCKSERVER_CONFIG', () => {
    const action = {
      type: UPDATE_MOCKSERVER_CONFIG,
      payload: {
        testing: 123
      }
    };
    const result = mockserverReducer(mockserverInitialState, action);

    expect(result).toEqual({
      ...mockserverInitialState,
      config: action.payload
    });
  });

  it('LOAD_MOCKREQUESTS', () => {
    const action = {
      type: LOAD_MOCKREQUESTS,
      data: [{ url: '/test', method: 'POST', responsePath: './storage/mock/responses/test.json' }]
    };
    const result = mockserverReducer(mockserverInitialState, action);

    expect(result).toEqual({
      ...mockserverInitialState,
      mocks: action.data
    });
  });

  it('DELETE_MOCK_ENDPOINT', () => {
    const action = {
      type: DELETE_MOCK_ENDPOINT,
      endpoint: { method: 'GET', url: '/test2' }
    };
    const result = mockserverReducer(
      {
        ...mockserverInitialState,
        mocks: [
          { method: 'GET', url: '/test' },
          { method: 'GET', url: '/test2' }
        ]
      },
      action
    );

    expect(result).toEqual({
      ...mockserverInitialState,
      message: action.data,
      mocks: [{ method: 'GET', url: '/test' }]
    });
  });

  it('LOAD_MOCK_RESPONSE', () => {
    const action = {
      type: LOAD_MOCK_RESPONSE,
      payload: {
        url: '/test',
        method: 'get'
      },
      data: {
        body: {
          testing: 123
        }
      }
    };
    const result = mockserverReducer(mockserverInitialState, action);

    expect(result).toEqual({
      ...mockserverInitialState,
      mockResponse: {
        request: action.payload,
        response: action.data
      }
    });
  });

  it('CLEAR_MOCK_RESPONSE', () => {
    const action = {
      type: CLEAR_MOCK_RESPONSE
    };
    const result = mockserverReducer(mockserverInitialState, action);

    expect(result).toEqual({
      ...mockserverInitialState,
      mockResponse: undefined
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
    const result = mockserverReducer(mockserverInitialState, action);

    expect(result).toEqual({
      ...mockserverInitialState,
      log: action.data
    });
  });

  it('CLEAR_MOCKSERVER_LOG', () => {
    const action = {
      type: CLEAR_MOCKSERVER_LOG
    };
    const result = mockserverReducer(mockserverInitialState, action);

    expect(result).toEqual({
      ...mockserverInitialState,
      log: []
    });
  });
});
