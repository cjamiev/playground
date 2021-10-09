import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_{{NAME}}, load{{Name}}, update{{Name}} } from './{{name}}Actions';
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
  { name: 'test' }
];

describe('{{name}}Actions', () => {
  it('load{{Name}}', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(content)
      }
    });
    load{{Name}}()(dispatch);

    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith(`/{{name}}`);
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_{{NAME}}, data: content });
    });
  });

  it('load{{Name}} - error', async () => {
    api.get.mockRejectedValueOnce(error);
    load{{Name}}()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('update{{Name}}', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    update{{Name}}(content)(dispatch);

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('{{name}}', {});
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_{{NAME}}, data: content });
    });
  });

  it('update{{Name}} - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    update{{Name}}(content)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
