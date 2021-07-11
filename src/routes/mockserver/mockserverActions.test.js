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
const mockDispatch = jest.fn();

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
    func(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_MOCKSERVER_CONFIG, data: [{ test: 123 }]});
    });
  });

  it('loadMockServerConfig - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadMockServerConfig()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('updateMockServerConfig', async () => {
    const payload = { testing: 123 };
    updateMockServerConfig(payload)(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: UPDATE_MOCKSERVER_CONFIG, data: 'testing 123', payload});
    });
  });

  it('updateMockServerConfig - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockServerConfig()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('loadMockRequests', async () => {
    loadMockRequests()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_MOCKREQUESTS, data: [{ test: 123 }]});
    });
  });

  it('loadMockRequests - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadMockRequests()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('updateMockRequests', async () => {
    updateMockRequests()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: UPDATE_MOCKREQUESTS, data: 'testing 123'});
    });
  });

  it('updateMockRequests - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockRequests()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('deleteMockEndpoint', async () => {
    const endpoint = { method: 'GET', url: '/api/test', responsePath: './filename' };
    deleteMockEndpoint(endpoint)(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: DELETE_MOCK_ENDPOINT, data: 'testing 123', endpoint});
    });
  });

  it('deleteMockEndpoint - error', async () => {
    const endpoint = { method: 'GET', url: '/api/test', responsePath: './filename' };
    api.post.mockRejectedValueOnce(error);
    deleteMockEndpoint()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });


  it('loadMockResponse', async () => {
    const payload = { method: 'GET', url: '/api/test', responsePath: './filename' };
    loadMockResponse(payload)(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_MOCK_RESPONSE, data: 'testing 123', payload});
    });
  });

  it('loadMockResponse - error', async () => {
    api.post.mockRejectedValueOnce(error);
    const payload = { method: 'GET', url: '/api/test', responsePath: './filename' };
    loadMockResponse(payload)(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
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
    updateMockResponse(payload)(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: UPDATE_MOCK_RESPONSE, data: 'testing 123' });
    });
  });

  it('updateMockResponse - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockResponse({})(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('clearMockResponse', () => {
    expect(clearMockResponse()).toEqual({ type: CLEAR_MOCK_RESPONSE });
  });

  it('createMockEndpoint', async () => {
    createMockEndpoint()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: CREATE_MOCK_ENDPOINT, data: 'testing 123'});
    });
  });

  it('createMockEndpoint - error', async () => {
    api.post.mockRejectedValueOnce(error);
    createMockEndpoint()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('updateMockEndpoint', async () => {
    updateMockEndpoint()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: UPDATE_MOCK_ENDPOINT, data: 'testing 123'});
    });
  });

  it('updateMockEndpoint - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockEndpoint()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('loadMockServerLog', async () => {
    loadMockServerLog()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_MOCKSERVER_LOG, data: [{ test: 123 }]});
    });
  });

  it('loadMockServerLog - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadMockServerLog()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });

  it('clearMockServerLog', async () => {
    clearMockServerLog()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: CLEAR_MOCKSERVER_LOG, data: 'testing 123'});
    });
  });

  it('clearMockServerLog - error', async () => {
    api.get.mockRejectedValueOnce(error);
    clearMockServerLog()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MOCKSERVER, error });
    });
  });
});