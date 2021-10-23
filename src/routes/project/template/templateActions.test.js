import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_TEMPLATES,
  loadTemplates,
  CREATE_FILES_FROM_TEMPLATES,
  createFilesFromTemplates
} from './templateActions';
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

const data = 'test data';
const message = 'test message';
const rootDir = 'test-dir';
const templates = ['template/one', 'template/two'];

describe('projectActions', () => {
  it('loadTemplates', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: templates
      }
    });
    loadTemplates()(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/project/?type=template&op=read');
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_TEMPLATES, data: templates });
    });
  });

  it('loadTemplates - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadTemplates()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('createFilesFromTemplates', async () => {
    api.post.mockResolvedValueOnce({
      data: {
        message
      }
    });
    createFilesFromTemplates(rootDir, name, templates)(dispatch);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith(`/project/?type=template&op=create&root=${rootDir}&name=${name}`, JSON.stringify(templates));
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_FILES_FROM_TEMPLATES, message });
    });
  });

  it('createFilesFromTemplates - error', async () => {
    api.post.mockRejectedValueOnce(error);
    createFilesFromTemplates()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});