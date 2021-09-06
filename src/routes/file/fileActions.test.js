import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_DIRECTORY,
  loadDirectory,
  LOAD_FILE,
  loadFile,
  WRITE_FILE,
  writeFile
} from './fileActions';
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
  content: 'testing 123',
  status: 'success'
};

describe('fileActions', () => {
  it('loadDirectory', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: [1,2,3]
      }
    });
    loadDirectory()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_DIRECTORY, data: [1,2,3]});
    });
  });

  it('loadDirectory - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadDirectory()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('loadFile', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: 'test file'
      }
    });
    loadFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_FILE, data: 'test file'});
    });
  });

  it('loadFile - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('writeFile', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    writeFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('writeFile - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    writeFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});