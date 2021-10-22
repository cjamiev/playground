import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockApi } from 'testHelper';
import Project from '../Project';
import api from 'api';

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

const mockGet = (url) => {
  if(url === '/db/?name=project.json') {
    return Promise.resolve({
      data: {
        data: JSON.stringify(projectDb)
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

describe('Regex', () => {
  it('Run updated on files with regex', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const packageTab = screen.getByText('Regex');
    fireEvent.click(packageTab);

    const fileRegexField = screen.getByLabelText('File Regex text field');
    const lineRegexField = screen.getByLabelText('Line Regex text field');
    const replaceField = screen.getByLabelText('Replace text field');
    const substringStartField = screen.getByLabelText('Substring number range start');
    const substringEndField = screen.getByLabelText('Substring number range end');
    const globalModifierOption = screen.getByText('Global');
    const submitBtn = screen.getByText('Submit');

    fireEvent.change(fileRegexField, { target: { value: 'Icon.js$' } });
    fireEvent.change(lineRegexField, { target: { value: '[.][0-9]{2,}' } });
    fireEvent.change(replaceField, { target: { value: '123' } });
    fireEvent.change(substringStartField, { target: { value: '0' } });
    fireEvent.change(substringEndField, { target: { value: '3' } });
    fireEvent.click(globalModifierOption);
    fireEvent.click(submitBtn);

    expect(api.post).toHaveBeenCalledWith(`/project/?type=regex&root=${rootDir}`, JSON.stringify({
      fileRegex: 'Icon.js$',
      lineRegex: '[.][0-9]{2,}',
      modifiers: 'g',
      lineRange: {
        start: '0',
        end: '3'
      },
      replace: '123'
    }));
  });
});
