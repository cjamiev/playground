import { waitFor } from '@testing-library/react';
import api from 'api';
import {
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
  CLEAR_MOCK_RESPONSE,
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
  clearMockServerLog,
  clearMockResponse
} from './mockserverActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: [{test:123}],
    message: 'testing 123'
  }
});
api.post.mockResolvedValue({
  data: {
    data: 'testing 123',
    message: 'testing 123'
  }
});

describe('mockserverActions', () => {
  it('loadMockServerConfig', async () => {
    const func = loadMockServerConfig();
    func(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_MOCKSERVER_CONFIG, data: [{ test: 123 }]});
    });
  });

  it('loadMockServerConfig - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadMockServerConfig()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('updateMockServerConfig', async () => {
    const payload = { testing: 123 };
    updateMockServerConfig(payload)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_MOCKSERVER_CONFIG, data: 'testing 123', payload});
    });
  });

  it('updateMockServerConfig - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockServerConfig()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('loadMockRequests', async () => {
    loadMockRequests()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_MOCKREQUESTS, data: [{ test: 123 }]});
    });
  });

  it('loadMockRequests - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadMockRequests()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('updateMockRequests', async () => {
    updateMockRequests()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_MOCKREQUESTS, data: 'testing 123'});
    });
  });

  it('updateMockRequests - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockRequests()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('deleteMockEndpoint', async () => {
    const endpoint = { method: 'GET', url: '/api/test', responsePath: './filename' };
    deleteMockEndpoint(endpoint)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: DELETE_MOCK_ENDPOINT, data: 'testing 123', endpoint});
    });
  });

  it('deleteMockEndpoint - error', async () => {
    const endpoint = { method: 'GET', url: '/api/test', responsePath: './filename' };
    api.post.mockRejectedValueOnce(error);
    deleteMockEndpoint()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });


  it('loadMockResponse', async () => {
    const payload = { method: 'GET', url: '/api/test', responsePath: './filename' };
    loadMockResponse(payload)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_MOCK_RESPONSE, data: 'testing 123', payload});
    });
  });

  it('loadMockResponse - error', async () => {
    api.post.mockRejectedValueOnce(error);
    const payload = { method: 'GET', url: '/api/test', responsePath: './filename' };
    loadMockResponse(payload)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('updateMockResponse', async () => {
    const payload = {
      filename: 'filename',
      content: {
        request: {
          url: '/test',
          method: 'GET'
        },
        response: {
          headers: { content: 'application/json'},
          status: 200,
          body: { test: 123},
          conditionalResponse: { test: 124}
        }
      }
    };
    updateMockResponse(payload)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_MOCK_RESPONSE, data: 'testing 123' });
    });
  });

  it('updateMockResponse - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockResponse({})(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('clearMockResponse', () => {
    expect(clearMockResponse()).toEqual({ type: CLEAR_MOCK_RESPONSE });
  });

  it('createMockEndpoint', async () => {
    createMockEndpoint()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_MOCK_ENDPOINT, data: 'testing 123'});
    });
  });

  it('createMockEndpoint - error', async () => {
    api.post.mockRejectedValueOnce(error);
    createMockEndpoint()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('updateMockEndpoint', async () => {
    updateMockEndpoint()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_MOCK_ENDPOINT, data: 'testing 123'});
    });
  });

  it('updateMockEndpoint - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockEndpoint()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('loadMockServerLog', async () => {
    loadMockServerLog()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_MOCKSERVER_LOG, data: [{ test: 123 }]});
    });
  });

  it('loadMockServerLog - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadMockServerLog()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('clearMockServerLog', async () => {
    clearMockServerLog()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CLEAR_MOCKSERVER_LOG, data: 'testing 123'});
    });
  });

  it('clearMockServerLog - error', async () => {
    api.get.mockRejectedValueOnce(error);
    clearMockServerLog()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });
});