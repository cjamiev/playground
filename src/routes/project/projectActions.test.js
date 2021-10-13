import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_REMOTE_URL,
  getRemoteUrl,
  DELETE_BRANCH,
  deleteBranch,
  SELECT_BRANCH,
  selectBranch,
  LOAD_BRANCHES,
  viewBranches,
  CREATE_STASH,
  createStash,
  SELECT_STASH,
  selectStash,
  LOAD_VIEW_STASH,
  viewStash,
  RESET_BRANCH,
  resetBranch,
  CLEAR_MESSAGE,
  clearMessage
} from './projectActions';
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

const remoteurl = 'remote url';
const data = 'test data';
const message = 'test message';
const rootDir = 'test-dir';
const name = 'test-name';

describe('projectActions', () => {
  it('getRemoteUrl', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: remoteurl
      }
    });
    getRemoteUrl(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=remoteurl&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_REMOTE_URL, data: remoteurl });
    });
  });

  it('getRemoteUrl - error', async () => {
    api.get.mockRejectedValueOnce(error);
    getRemoteUrl()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('deleteBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    deleteBranch(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=deletebranch&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: DELETE_BRANCH, message });
    });
  });

  it('deleteBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    deleteBranch()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('selectBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    selectBranch(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=selectbranch&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: SELECT_BRANCH, message });
    });
  });

  it('selectBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    selectBranch()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('viewBranches', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data
      }
    });
    viewBranches(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=viewbranches&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_BRANCHES, data });
    });
  });

  it('viewBranches - error', async () => {
    api.get.mockRejectedValueOnce(error);
    viewBranches()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('createStash', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    createStash(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=createstash&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_STASH, message });
    });
  });

  it('createStash - error', async () => {
    api.get.mockRejectedValueOnce(error);
    createStash()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('selectStash', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    selectStash(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=selectstash&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: SELECT_STASH, message });
    });
  });

  it('selectStash - error', async () => {
    api.get.mockRejectedValueOnce(error);
    selectStash()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('viewStash', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data
      }
    });
    viewStash(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=viewstash&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_VIEW_STASH, data });
    });
  });

  it('viewStash - error', async () => {
    api.get.mockRejectedValueOnce(error);
    viewStash()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('resetBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    resetBranch(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=resetbranch&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: RESET_BRANCH, message });
    });
  });

  it('resetBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    resetBranch()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('clearMessage', () => {
    expect(clearMessage()).toEqual({ type: CLEAR_MESSAGE });
  });
});
