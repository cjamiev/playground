import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_SNIPPET_DIRECTORY,
  loadSnippetDirectory,
  LOAD_SNIPPET,
  loadSnippet
} from './snippetActions';
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

const dirContent = ['fileOne', 'fileTwo'];
const fileContent = 'test contents';

describe('snippetActions', () => {
  it('loadSnippetDirectory', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: dirContent
      }
    });
    loadSnippetDirectory()(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/project/?type=snippet&op=read');
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SNIPPET_DIRECTORY, data: dirContent });
    });
  });

  it('loadSnippetDirectory - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadSnippetDirectory()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('loadSnippet', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: fileContent
      }
    });
    loadSnippet('filename')(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/project/?type=snippet&op=read&name=filename');
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_SNIPPET, data: fileContent });
    });
  });

  it('loadSnippet - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadSnippet()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
