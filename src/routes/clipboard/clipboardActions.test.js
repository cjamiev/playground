import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_CLIPBOARD,
  ERROR_CLIPBOARD,
  loadClipboard
} from './clipboardActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: '{ "one": [1,2,3], "two": [2,3,4] }'
  }
});

describe('clipboardActions', () => {
  it('loadClipboard', async () => {
    const func = loadClipboard();
    func(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_CLIPBOARD, data: { one: [1,2,3], two: [2,3,4]}});
    });
  });

  it('loadClipboard - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadClipboard()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_CLIPBOARD, error });
    });
  });
});