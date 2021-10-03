import { fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, mockApi } from 'testHelper';
import File from './File';

const mockGet = (url) => {
  if(url === '/file') {
    return Promise.resolve({
      data: {
        data: ['test.txt']
      }
    });
  }
  else {
    return Promise.resolve({
      data: {
        data: 'test file contents'
      }
    });
  }
};
const mockPost = () => {
  return Promise.resolve({
    data: {
      message: 'successful'
    }
  });
};
const apiMock = mockApi(mockGet, mockPost);

const pathname = '/file';
const ZERO = 0;

describe('File', () => {
  it('handle copy', () => {
    document.execCommand = jest.fn();
    reduxTestWrapper(File, {}, {}, pathname);

    const copyBtn = screen.getByLabelText('copy');

    fireEvent.click(copyBtn);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('handle validate', () => {
    reduxTestWrapper(File, {}, {}, pathname);

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);

    const contentField = screen.getByLabelText('Content text area');
    const validateBtn = screen.getByText('Validate');

    fireEvent.change(contentField, { target: { value: '1 2 3 4 5' } });
    fireEvent.click(validateBtn);
    expect(screen.getByText('Is NOT Valid JSON')).toBeInTheDocument();

    fireEvent.change(contentField, { target: { value: '{ "test": 123 }' } });
    fireEvent.click(validateBtn);
    expect(screen.getByText('Is Valid JSON')).toBeInTheDocument();
  });

  it('handle sort', () => {
    reduxTestWrapper(File, {}, {}, pathname);

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);

    const contentField = screen.getByLabelText('Content text area');
    const sortAscBtn = screen.getByText('Sort Asc');
    const sortDescBtn = screen.getByText('Sort Desc');

    fireEvent.change(contentField, { target: { value: '1 3 2 5 4' } });

    fireEvent.click(sortAscBtn);
    expect(screen.getByText('1 2 3 4 5')).toBeInTheDocument();

    fireEvent.click(sortDescBtn);
    expect(screen.getByText('5 4 3 2 1')).toBeInTheDocument();
  });

  it('handle split/join', () => {
    reduxTestWrapper(File, {}, {}, pathname);

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);

    const contentField = screen.getByLabelText('Content text area');
    const splitBtn = screen.getByText('Split');
    const joinBtn = screen.getByText('Join');
    const delimiterDropdown = screen.getByText('Delimiter space');

    fireEvent.change(contentField, { target: { value: '1 3 2 5 4' } });

    fireEvent.click(splitBtn);
    fireEvent.click(delimiterDropdown);
    fireEvent.click(screen.getByText('comma'));

    fireEvent.click(joinBtn);
    expect(screen.getByText('1,3,2,5,4')).toBeInTheDocument();
  });

  it('handle trim', () => {
    reduxTestWrapper(File, {}, {}, pathname);

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);

    const contentField = screen.getByLabelText('Content text area');
    const trimBtn = screen.getByText('Trim');

    fireEvent.change(contentField, { target: { value: '1    4' } });
    fireEvent.click(trimBtn);

    expect(screen.getByText('1 4')).toBeInTheDocument();
  });

  it('handle find and replace', () => {
    reduxTestWrapper(File, {}, {}, pathname);

    const sidePanelBtn = screen.getByLabelText('triple bar');
    fireEvent.click(sidePanelBtn);

    const contentField = screen.getByLabelText('Content text area');
    const findField = screen.getByLabelText('Search text field');
    const replaceField = screen.getByLabelText('Replace text field');
    const convertBtn = screen.getByText('Convert');

    fireEvent.change(contentField, { target: { value: '1 2 1 2 1' } });
    fireEvent.change(findField, { target: { value: '1' } });
    fireEvent.change(replaceField, { target: { value: '3' } });

    fireEvent.click(convertBtn);

    expect(screen.getByText('3 2 1 2 1')).toBeInTheDocument();
  });

  it('handle save', () => {
    reduxTestWrapper(File, {}, {}, pathname);

    const nameField = screen.getByPlaceholderText('Enter File Name');
    const contentField = screen.getByLabelText('Content text area');
    const saveBtn = screen.getByLabelText('save');

    fireEvent.change(nameField, { target: { value: 'test2.txt' } });
    fireEvent.change(contentField, { target: { value: '1 2 3 4 5' } });
    fireEvent.click(saveBtn);

    expect(apiMock.post).toHaveBeenCalledWith('/file', { filename: 'test2.txt', content: '1 2 3 4 5' });
  });

  it('handle loading existing file', async () => {
    reduxTestWrapper(File, {}, {}, pathname);

    const fileDropdown = screen.getByText('Select an existing file');
    fireEvent.click(fileDropdown);

    await waitFor(() => {
      expect(screen.getByText('test.txt')).toBeInTheDocument();
    });
    const testBtn = screen.getByText('test.txt');
    fireEvent.click(testBtn);

    await waitFor(() => {
      expect(screen.getByText('test file contents')).toBeInTheDocument();
    });
  });
});