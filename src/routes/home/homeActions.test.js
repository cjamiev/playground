import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_DIRECTORY,
  ERROR_DIRECTORY,
  loadDirectory,
  LOAD_FILE,
  ERROR_FILE,
  loadFile,
  WRITE_FILE,
  writeFile
} from './homeActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');

describe('homeActions', () => {
  it('loadDirectory', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: [1,2,3]
      }
    });
    const func = loadDirectory();
    func(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_DIRECTORY, data: [1,2,3]});
    });
  });

  it('loadDirectory - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadDirectory()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_DIRECTORY, error });
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
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_FILE, error });
    });
  });

  it('writeFile', async () => {
    api.post.mockResolvedValue({
      data: {
        data: 'test message'
      }
    });
    writeFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: WRITE_FILE, data: 'test message'});
    });
  });

  it('writeFile - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    writeFile()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_FILE, error });
    });
  });
});