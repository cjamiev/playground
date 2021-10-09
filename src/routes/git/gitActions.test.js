import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_REMOTE_URL,
  getRemoteUrl,
  LOAD_DELETE,
  deleteBranch,
  LOAD_SELECT_BRANCH,
  selectBranch,
  LOAD_BRANCHES,
  viewBranches,
  LOAD_CREATE_STASH,
  createStash,
  LOAD_SELECT_STASH,
  selectStash,
  LOAD_VIEW_STASH,
  viewStash,
  LOAD_RESET,
  reset,
  CLEAR_MESSAGE,
  clearMessage
} from './gitActions';
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

describe('gitActions', () => {
  it('getRemoteUrl', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: remoteurl
      }
    });
    getRemoteUrl(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/git/?type=remoteurl&root=${rootDir}`);
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
      expect(api.get).toHaveBeenCalledWith(`/git/?type=delete&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_DELETE, message });
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
      expect(api.get).toHaveBeenCalledWith(`/git/?type=select&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SELECT_BRANCH, message });
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
      expect(api.get).toHaveBeenCalledWith(`/git/?type=view&root=${rootDir}`);
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
      expect(api.get).toHaveBeenCalledWith(`/git/?type=stash&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_CREATE_STASH, message });
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
      expect(api.get).toHaveBeenCalledWith(`/git/?type=selectstash&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SELECT_STASH, message });
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
      expect(api.get).toHaveBeenCalledWith(`/git/?type=viewstash&root=${rootDir}`);
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

  it('reset', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    reset(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/git/?type=reset&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_RESET, message });
    });
  });

  it('reset - error', async () => {
    api.get.mockRejectedValueOnce(error);
    reset()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('clearMessage', () => {
    expect(clearMessage()).toEqual({ type: CLEAR_MESSAGE });
  });
});
