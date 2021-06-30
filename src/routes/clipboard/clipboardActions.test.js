import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_CLIPBOARD, ERROR_CLIPBOARD, loadClipboard } from './clipboardActions';

const mockDispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: '[]'
  }
});

describe('clipboardActions', () => {
  it('loadClipboard', async () => {
    loadClipboard()(mockDispatch);

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_CLIPBOARD, data: []});
    });
  });

  it('loadClipboard - error', async () => {
    api.get.mockRejectedValue(new Error('Test Message'));
    loadClipboard()(mockDispatch);

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_CLIPBOARD, error: 'Test Message'});
    });
  });
});