import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, mockApi, mockGet, mockPost } from 'testHelper';
import Project from './Project';
import api from 'api';
import { TIME } from 'constants/time';

const projectDb = {
  directories: [
    './',
    'C:/doc'
  ],
  regexes: [
    {
      description: 'reduce svg icon numbers to three decimals',
      fileRegex: 'Icon.js$',
      lineRegex: '[.][0-9]{2,}',
      modifiers: 'g',
      lineRange: {
        start: 0,
        end: 3
      },
      replace: ''
    }
  ]
};
const templates = ['template/one', 'template/two'];
const incorrectDirData = 'The system cannot find the path specified.';
const apiMock = mockApi(mockGet, mockPost);

const rootDir = './';
const defaultStoreProps = {
  project: {
    directories: ['dir1', 'dir2'],
    regexes: [],
    remoteUrl: 'test-url',
    branches: [],
    stashes: [],
    packageJson: {},
    versions: {},
    message: ''
  }
};

describe('Project', () => {
  it('updating root dir', async () => {
    jest.useFakeTimers();
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const rootField = screen.getByLabelText('Root text field');

    fireEvent.change(rootField, { target: { value: 'incorrectdir' } });
    act(() => jest.advanceTimersByTime(TIME.A_SECOND));

    await waitFor(() => {
      expect(screen.getByText(`Remote Url: ${incorrectDirData}`)).toBeInTheDocument();
    });

    fireEvent.change(rootField, { target: { value: './' } });
    act(() => jest.advanceTimersByTime(TIME.A_SECOND));

    await waitFor(() => {
      expect(screen.getByText('Remote Url: test-url')).toBeInTheDocument();
    });
  });

  it('updating root dir by using dropdown', async () => {
    jest.useFakeTimers();
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const dirDropdown = screen.getByText('Directories');

    fireEvent.click(dirDropdown);
    fireEvent.click(screen.getByText('dir1'));
    act(() => jest.advanceTimersByTime(TIME.A_SECOND));

    await waitFor(() => {
      expect(screen.getByText('Remote Url: dir1-url')).toBeInTheDocument();
    });
  });
});
