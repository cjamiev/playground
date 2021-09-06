import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_CLIPBOARD,
  ERROR_CLIPBOARD,
  loadClipboard,
  updateClipboard
} from './clipboardActions';
import { CREATE_ALERT } from 'components/alert/alertActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: '{ "one": [1,2,3], "two": [2,3,4] }'
  }
});
api.post.mockResolvedValue({
  data: {
    message: 'testing 123'
  }
});
const errorObject = {
  content: 'Test Message',
  status: 'error'
};
const successObject = {
  content: 'testing 123',
  status: 'success'
};

describe('clipboardActions', () => {
  it('loadClipboard', async () => {
    loadClipboard()(dispatch);

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

  it('updateClipboard', async () => {
    updateClipboard({ test : 123 })(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('updateClipboard - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateClipboard()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});