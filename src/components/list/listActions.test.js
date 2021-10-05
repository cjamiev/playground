import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  loadCommand,
  LOAD_COMMAND_RESULT,
  executeCommand,
  EXECUTE_COMMAND_RESULT,
  ERROR_COMMAND_RESULT,
  clearCommand,
  CLEAR_COMMAND_RESULT
} from './listActions';
import { CREATE_ALERT } from 'components/alert/alertActions';

const ONE = 1;
const TWO = 2;
const THREE = 3;
const error = new Error('Test Message');
const dispatch = jest.fn();
const errorObject = {
  content: 'Test Message',
  status: 'error'
};

jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: [ONE, TWO, THREE],
    message: 'test message'
  }
});

describe('listActions', () => {
  it('loadCommand', async () => {
    loadCommand()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_COMMAND_RESULT, data: [ONE, TWO, THREE] });
    });
  });

  it('loadCommand - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadCommand()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('executeCommand', async () => {
    executeCommand('file', 'args')(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: EXECUTE_COMMAND_RESULT, data: 'test message' });
    });
  });

  it('executeCommand - error', async () => {
    api.get.mockRejectedValueOnce(error);
    executeCommand('file', 'args')(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_COMMAND_RESULT, error: error.message });
    });
  });

  it('clearCommand', () => {
    expect(clearCommand()).toEqual({ type: CLEAR_COMMAND_RESULT });
  });
});
