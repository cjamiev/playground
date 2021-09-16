import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_COMMAND_RESULT,
  ERROR_COMMAND_RESULT,
  executeCommand,
  clearCommand,
  CLEAR_COMMAND_RESULT
} from './listActions';

const errorObject = new Error('Test Message');
const dispatch = jest.fn();

jest.mock('api');
api.get.mockResolvedValue({
  data: {
    message: 'test message'
  }
});

describe('listActions', () => {
  it('executeCommand', async () => {
    executeCommand('file', 'args')(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_COMMAND_RESULT, data: 'test message'});
    });
  });

  it('executeCommand - error', async () => {
    api.get.mockRejectedValueOnce(errorObject);
    executeCommand('file', 'args')(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_COMMAND_RESULT, error:  errorObject.message});
    });
  });

  it('clearCommand', () => {
    expect(clearCommand()).toEqual({ type: CLEAR_COMMAND_RESULT });
  });
});