import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_PASSWORD, ERROR_PASSWORD, loadPassword } from './clipboardActions';

const mockDispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: '[]'
  }
});

describe('clipboardActions', () => {
  it('loadPassword', async () => {
    loadPassword()(mockDispatch);

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_PASSWORD, data: []});
    });
  });

  it('loadPassword - error', async () => {
    api.get.mockRejectedValue(new Error('Test Message'));
    loadPassword()(mockDispatch);

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_PASSWORD, error: 'Test Message'});
    });
  });
});