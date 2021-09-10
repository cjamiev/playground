import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_COMMAND_RESULT,
  ERROR_COMMAND_RESULT,
  executeCommand,
  clearCommand,
  CLEAR_COMMAND_RESULT
} from './listActions';

const error = new Error('Test Message');
const dispatch = jest.fn();

jest.mock('api');
api.get.mockResolvedValue({
  data: {
    message: 'test message'
  }
});

describe('listActions', () => {
  it('executeCommand', async () => {
    executeCommand('mode', 'file', 'args')(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_COMMAND_RESULT, data: 'test message'});
    });
  });

  it('executeCommand - error', async () => {
    api.get.mockRejectedValueOnce(new Error('Test Message'));
    executeCommand('mode', 'file', 'args')(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: ERROR_COMMAND_RESULT, error });
    });
  });

  it('clearCommand', () => {
    expect(clearCommand()).toEqual({ type: CLEAR_COMMAND_RESULT });
  });
});