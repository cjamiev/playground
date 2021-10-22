import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, mockApi } from 'testHelper';
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

const mockGet = (url) => {
  if(url === '/db/?name=project.json') {
    return Promise.resolve({
      data: {
        data: JSON.stringify(projectDb)
      }
    });
  } else if (url === '/project/?type=template&op=read') {
    return Promise.resolve({
      data: {
        data: templates
      }
    });
  } else if (url === '/project/?type=git&op=remoteurl&root=./') {
    return Promise.resolve({
      data: {
        data: 'test-url'
      }
    });
  } else if (url === '/project/?type=git&op=viewbranches&root=./') {
    return Promise.resolve({
      data: {
        data: 'branch1\nbranch2\n'
      }
    });
  } else if (url === '/project/?type=git&op=viewstash&root=./') {
    return Promise.resolve({
      data: {
        data: 'stash@{1}: On master: stash1\nstash@{2}: On master: stash2\n'
      }
    });
  } else if (url.includes('testdir')) {
    return Promise.resolve({
      data: {
        data: incorrectDirData
      }
    });
  } else {
    return Promise.resolve({
      data: {
        message: 'test message'
      }
    });
  }
};
const mockPost = () => { return Promise.resolve({});};
const apiMock = mockApi(mockGet, mockPost);

const rootDir = './';
const defaultStoreProps = {
  project: {
    directories: [],
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

    fireEvent.change(rootField, { target: { value: 'testdir' } });
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
});
