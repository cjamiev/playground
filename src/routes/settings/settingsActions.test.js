import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_SETTINGS, loadConfig, updateConfig } from './configActions';
import { CREATE_ALERT } from 'components/alert/alertActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
const errorObject = {
  content: 'Test Message',
  status: 'error'
};
const successObject = {
  content: 'Updated',
  status: 'success',
  timer: 1000
};

const content = [{ name: 'test' }];

describe('configActions', () => {
  it('loadConfig', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(content)
      }
    });
    loadConfig()(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/db/?name=config.json');
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SETTINGS, data: content });
    });
  });

  it('loadConfig - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadConfig()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updateConfig', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    updateConfig(content)(dispatch);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/db', { content: JSON.stringify(content), filename: 'config.json' });
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SETTINGS, data: content });
    });
  });

  it('updateConfig - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    updateConfig(content)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
