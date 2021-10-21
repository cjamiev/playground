import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_PROJECT,
  loadProject,
  updateProject,
  LOAD_REMOTE_URL,
  getRemoteUrl,
  DELETE_BRANCH,
  deleteBranch,
  CREATE_BRANCH,
  createBranch,
  MERGE_BRANCH,
  mergeBranch,
  SELECT_BRANCH,
  selectBranch,
  LOAD_BRANCHES,
  viewBranches,
  CREATE_STASH,
  createStash,
  DELETE_STASH,
  deleteStash,
  SELECT_STASH,
  selectStash,
  LOAD_VIEW_STASH,
  viewStash,
  RESET_BRANCH,
  resetBranch,
  LOAD_PACKAGE,
  getPackageJson,
  LOAD_VERSIONS,
  getDependencyVersions,
  RUN_SCRIPT,
  runNpmScript,
  UPDATE_PACKAGE,
  updatePackage,
  UPDATE_FILES_BY_REGEX,
  updateFilesByRegex,
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
const packageJson = { one: 1, two: 2, three: 3 };
const regexContent = {
  fileRegex: /Icon.js$/,
  lineRegex: /[.][0-9]{2,}/g,
  lineRange: {
    start: 0,
    end: 3
  },
  replace: '123'
};

const projectDb = {
  directories: [
    './',
    'C:/doc'
  ],
  regexes: [
    {
      description: 'reduce svg icon numbers to three decimals',
      fileRegex: 'Icon.js$',
      lineRegex: '[.][0-9]{2,}',
      modifiers: 'g',
      lineRange: {
        start: 0,
        end: 3
      },
      replace: ''
    }
  ]
};

describe('projectActions', () => {
  it('loadProject', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(projectDb)
      }
    });
    loadProject()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_PROJECT, data: projectDb });
    });
  });

  it('loadProject - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadProject()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updateProject', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    updateProject(projectDb)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_PROJECT, data: projectDb });
    });
  });

  it('updateProject - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    updateProject(projectDb)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('getRemoteUrl', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: remoteurl
      }
    });
    getRemoteUrl(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=remoteurl&root=${rootDir}`);
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
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=deletebranch&root=${rootDir}&name=${name}`);
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

  it('createBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    createBranch(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=createbranch&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_BRANCH, message });
    });
  });

  it('createBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    createBranch()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('mergeBranch', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    mergeBranch(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=mergebranch&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: MERGE_BRANCH, message });
    });
  });

  it('mergeBranch - error', async () => {
    api.get.mockRejectedValueOnce(error);
    mergeBranch()(dispatch);

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
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=selectbranch&root=${rootDir}&name=${name}`);
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
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=viewbranches&root=${rootDir}`);
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
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=createstash&root=${rootDir}&name=${name}`);
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

  it('deleteStash', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    deleteStash(rootDir, name)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=deletestash&root=${rootDir}&name=${name}`);
      expect(dispatch).toHaveBeenCalledWith({ type: DELETE_STASH, message });
    });
  });

  it('deleteStash - error', async () => {
    api.get.mockRejectedValueOnce(error);
    deleteStash()(dispatch);

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
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=selectstash&root=${rootDir}&name=${name}`);
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
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=viewstash&root=${rootDir}`);
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
      expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=resetbranch&root=${rootDir}`);
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

  it('getPackageJson', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data
      }
    });
    getPackageJson(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=package&op=read&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_PACKAGE, data });
    });
  });

  it('getPackageJson - error', async () => {
    api.get.mockRejectedValueOnce(error);
    getPackageJson()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('getDependencyVersions', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data
      }
    });
    getDependencyVersions(rootDir)(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=package&op=getversions&root=${rootDir}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_VERSIONS, data });
    });
  });

  it('getDependencyVersions - error', async () => {
    api.get.mockRejectedValueOnce(error);
    getDependencyVersions()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('runNpmScript', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        message
      }
    });
    runNpmScript(rootDir, 'script-name')(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/project/?type=package&op=runscript&root=${rootDir}&content=script-name`);
      expect(dispatch).toHaveBeenCalledWith({ type: RUN_SCRIPT, message });
    });
  });

  it('runNpmScript - error', async () => {
    api.get.mockRejectedValueOnce(error);
    runNpmScript()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updatePackage', async () => {
    api.post.mockResolvedValueOnce({
      data: {
        message
      }
    });
    updatePackage(rootDir, packageJson)(dispatch);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(`/project/?type=package&op=update&root=${rootDir}`, JSON.stringify(packageJson));
      expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_PACKAGE, message });
    });
  });

  it('updatePackage - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updatePackage()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updateFilesByRegex', async () => {
    api.post.mockResolvedValueOnce({
      data: {
        message
      }
    });
    updateFilesByRegex(rootDir, regexContent)(dispatch);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(`/project/?type=regex&root=${rootDir}`, JSON.stringify(regexContent));
      expect(dispatch).toHaveBeenCalledWith({ type: UPDATE_FILES_BY_REGEX, message });
    });
  });

  it('updateFilesByRegex - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateFilesByRegex()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('clearMessage', () => {
    expect(clearMessage()).toEqual({ type: CLEAR_MESSAGE });
  });
});
