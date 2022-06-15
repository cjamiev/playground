import { waitFor } from '@testing-library/react';
import api from 'api';
import { LOAD_GENERATOR_RECORDS, loadGeneratorRecords, updatedGeneratorRecords } from './generatorActions';
import { CREATE_ALERT } from 'components/atoms/Alert/alertActions';

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
  timer: 3000
};

const content = [
  { name: 'test', value: { parentBackgroundColor: {}, hoverStyle: {}, normalStyle: {}, activeStyle: {} } }
];

describe.skip('generatorActions', () => {
  it('loadGeneratorRecords', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: JSON.stringify(content)
      }
    });
    loadGeneratorRecords()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_GENERATOR_RECORDS, data: content });
    });
  });

  it('loadGeneratorRecords - error', async () => {
    api.get.mockRejectedValueOnce(error);
    loadGeneratorRecords()(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });

  it('updatedGeneratorRecords', async () => {
    api.post.mockResolvedValue({
      data: {
        message: 'testing 123'
      }
    });
    updatedGeneratorRecords(content)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: successObject });
      expect(dispatch).toHaveBeenCalledWith({ type: LOAD_GENERATOR_RECORDS, data: content });
    });
  });

  it('updatedGeneratorRecords - error', async () => {
    api.post.mockRejectedValueOnce(new Error('Test Message'));
    updatedGeneratorRecords(content)(dispatch);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({ type: CREATE_ALERT, data: errorObject });
    });
  });
});
