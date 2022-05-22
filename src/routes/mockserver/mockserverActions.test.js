import { waitFor } from '@testing-library/react';
import api from 'api';
import {
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
} from './mockserverActions';
import { CREATE_ALERT } from 'components/alert/alertActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: [{ test: 123 }],
    message: 'testing 123'
  }
});
api.post.mockResolvedValue({
  data: {
    data: 'testing 123',
    message: 'testing 123'
  }
});
const errorObject = {
  content: 'Test Message',
  status: 'error'
};
const successObject = {
  content: 'Updated',
  status: 'success',
  timer: 1000
};

describe('mockserverActions', () => {
  it('loadMockServerConfig', async () => {
    loadMockServerConfig()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_MOCKSERVER_SETTINGS, data: [{ test: 123 }] });
    });
  });

  it('loadMockServerConfig - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadMockServerConfig()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updateMockServerConfig', async () => {
    const payload = { testing: 123 };
    updateMockServerConfig(payload)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('updateMockServerConfig - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockServerConfig()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('loadMockRequests', async () => {
    loadMockRequests()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_MOCKREQUESTS, data: [{ test: 123 }] });
    });
  });

  it('loadMockRequests - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadMockRequests()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updateMockRequests', async () => {
    updateMockRequests()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('updateMockRequests - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockRequests()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('deleteMockEndpoint', async () => {
    const endpoint = { method: 'GET', url: '/api/test', responsePath: './filename' };
    deleteMockEndpoint(endpoint)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: DELETE_MOCK_ENDPOINT, endpoint });
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('deleteMockEndpoint - error', async () => {
    const endpoint = { method: 'GET', url: '/api/test', responsePath: './filename' };
    api.post.mockRejectedValueOnce(error);
    deleteMockEndpoint()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('loadMockResponse', async () => {
    const payload = { method: 'GET', url: '/api/test', responsePath: './filename' };
    loadMockResponse(payload)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_MOCK_RESPONSE, data: 'testing 123', payload });
    });
  });

  it('loadMockResponse - error', async () => {
    api.post.mockRejectedValueOnce(error);
    const payload = { method: 'GET', url: '/api/test', responsePath: './filename' };
    loadMockResponse(payload)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
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
          headers: { content: 'application/json' },
          status: 200,
          body: { test: 123 },
          conditionalResponse: { test: 124 }
        }
      }
    };
    updateMockResponse(payload)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('updateMockResponse - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateMockResponse({})(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('clearMockResponse', () => {
    expect(clearMockResponse()).toEqual({ type: CLEAR_MOCK_RESPONSE });
  });

  it('createMockEndpoint', async () => {
    createMockEndpoint()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('createMockEndpoint - error', async () => {
    api.post.mockRejectedValueOnce(error);
    createMockEndpoint()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('loadMockServerLog', async () => {
    loadMockServerLog()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_MOCKSERVER_LOG, data: [{ test: 123 }] });
    });
  });

  it('loadMockServerLog - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadMockServerLog()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('clearMockServerLog', async () => {
    clearMockServerLog()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('clearMockServerLog - error', async () => {
    api.get.mockRejectedValueOnce(error);
    clearMockServerLog()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
