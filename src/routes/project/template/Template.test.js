import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockApi } from 'testHelper';
import Project from '../Project';
import api from 'api';

const templates = ['templateOne', 'templateTwo'];

const mockGet = (url) => {
  if(url === '/db/?name=project.json') {
    return Promise.resolve({
      data: {
        data: JSON.stringify({ directories: ['./'], regexes: []})
      }
    });
  } else if (url === '/project/?type=template&op=read') {
    return Promise.resolve({
      data: {
        data: templates
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
    remoteUrl: '',
    branches: [],
    stashes: [],
    packageJson: {},
    versions: {},
    templates,
    message: ''
  }
};

describe('Template', () => {
  it('Create Files from templates', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const templateTab = screen.getByText('Template');
    fireEvent.click(templateTab);

    const nameField = screen.getByLabelText('Name text field');
    const templateOneBtn = screen.getByText('templateOne');
    const createBtn = screen.getByText('Create');

    fireEvent.change(nameField, { target: { value: 'TestOne' } });
    fireEvent.click(templateOneBtn);
    fireEvent.click(createBtn);

    expect(api.post).toHaveBeenCalledWith(`/project/?type=template&op=create&root=${rootDir}&name=TestOne`, JSON.stringify(['templateOne']));
  });

  it('handle select all button', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const templateTab = screen.getByText('Template');
    fireEvent.click(templateTab);
    fireEvent.click(screen.getByText('Select All'));

    expect(screen.queryByLabelText('templateOne checkbox option is selected')).toBeInTheDocument();
    expect(screen.queryByLabelText('templateTwo checkbox option is selected')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Unselect All'));

    expect(screen.queryByLabelText('templateOne checkbox option is not selected')).toBeInTheDocument();
    expect(screen.queryByLabelText('templateTwo checkbox option is not selected')).toBeInTheDocument();
  });
});
