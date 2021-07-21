import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_COMMAND_RESULT,
  ERROR_COMMAND_RESULT,
  executeCommand
} from './listActions';

const error = new Error('Test Message');
const mockDispatch = jest.fn();

jest.mock('api');
api.get.mockResolvedValue({
  data: {
    message: 'test message'
  }
});

describe('listActions', () => {
  it('executeCommand', async () => {
    executeCommand('mode', 'file', 'args')(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_COMMAND_RESULT, data: 'test message'});
    });
  });

  it('executeCommand - error', async () => {
    api.get.mockRejectedValueOnce(new Error('Test Message'));
    executeCommand('mode', 'file', 'args')(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_COMMAND_RESULT, error });
    });
  });
});