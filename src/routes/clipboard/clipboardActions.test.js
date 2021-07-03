import { waitFor } from '@testing-library/react';
import api from 'api';
import {
  LOAD_PASSWORD,
  ERROR_PASSWORD,
  loadPassword,
  LOAD_FOOD,
  ERROR_FOOD,
  loadFood,
  LOAD_MAIN,
  ERROR_MAIN,
  loadMain
} from './clipboardActions';

const error = new Error('Test Message');
const mockDispatch = jest.fn();

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: '[{"test":123}]'
  }
});

describe('clipboardActions', () => {
  it('loadPassword', async () => {
    const func = loadPassword();
    func(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_PASSWORD, data: [{ test: 123 }]});
    });
  });

  it('loadPassword - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadPassword()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_PASSWORD, error });
    });
  });

  it('loadFood', async () => {
    loadFood()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_FOOD, data: [{ test: 123 }]});
    });
  });

  it('loadFood - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadFood()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_FOOD, error });
    });
  });

  it('loadMain', async () => {
    loadMain()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: LOAD_MAIN, data: [{ test: 123 }]});
    });
  });

  it('loadMain - error', async () => {
    api.get.mockRejectedValueOnce(new Error('Test Message'));
    loadMain()(mockDispatch);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: ERROR_MAIN, error });
    });
  });
});