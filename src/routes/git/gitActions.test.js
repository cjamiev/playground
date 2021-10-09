import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_GIT, loadGit, updateGit } from './gitActions';
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

const content = [
  { name: 'test', value: { parentBackgroundColor: {}, hoverStyle: {}, normalStyle: {}, activeStyle: {} } }
];

describe('gitActions', () => {
  it('loadGit', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(content)
      }
    });
    loadGit()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_GIT, data: content });
    });
  });

  it('loadGit - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadGit()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updateGit', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    updateGit(content)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_GIT, data: content });
    });
  });

  it('updateGit - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    updateGit(content)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
