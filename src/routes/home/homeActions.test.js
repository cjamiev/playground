import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_HOME,
  ERROR_HOME,
  loadHome,
  updateHome
} from './homeActions';
import { CREATE_ALERT } from 'components/alert/alertActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: '{ "one": [1,2,3], "two": [2,3,4] }'
  }
});
api.post.mockResolvedValue({
  data: {
    message: 'testing 123'
  }
});
const errorObject = {
  content: 'Test Message',
  status: 'error'
};
const successObject = {
  content: 'testing 123',
  status: 'success'
};

describe('homeActions', () => {
  it('loadHome', async () => {
    loadHome()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_HOME, data: { one: [1,2,3], two: [2,3,4]}});
    });
  });

  it('loadHome - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadHome()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_HOME, error });
    });
  });

  it('updateHome', async () => {
    updateHome({ test : 123 })(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
    });
  });

  it('updateHome - error', async () => {
    api.post.mockRejectedValueOnce(error);
    updateHome()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});