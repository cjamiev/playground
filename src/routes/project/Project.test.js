import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockApi } from 'testHelper';
import Project from './Project';
import api from 'api';

const mockGet = (url) => {
  return Promise.resolve({
    data: {
      message: 'test message'
    }
  });
};
const mockPost = () => {return Promise.resolve({});};
const apiMock = mockApi(mockGet, mockPost);

const ZERO = 0;
const ONE = 1;
const rootDir = './';
const name = 'test-stash';
const defaultStoreProps = {
  project: {
    remoteUrl: 'test-url',
    branches: ['branch1', 'branch2'],
    stashes: ['stash{1}', 'stash{2}'],
    message: ''
  }
};

describe('Project', () => {
  it('should handle remote url', () => {
    document.execCommand = jest.fn();
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const copyBtn = screen.getByLabelText('copy');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    fireEvent.click(copyBtn);
    const copyEl = appendChildSpy.mock.calls[ZERO][ZERO];

    expect(screen.queryByText(`Remote Url: ${defaultStoreProps.project.remoteUrl}`)).toBeInTheDocument();
    expect(copyEl.value).toEqual(defaultStoreProps.project.remoteUrl);
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });

  it('switch branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const branchesBtn = screen.getByText('Branches');
    fireEvent.click(branchesBtn);
    fireEvent.click(screen.getByText('branch1'));
    fireEvent.click(screen.getByText('Checkout branch1'));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=selectbranch&root=${rootDir}&name=branch1`);
  });

  it('delete branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const branchesBtn = screen.getByText('Branches');
    fireEvent.click(branchesBtn);
    fireEvent.click(screen.getByText('branch1'));
    fireEvent.click(screen.getByText('Delete branch1'));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=deletebranch&root=${rootDir}&name=branch1`);
  });

  it('create branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const nameField = screen.getByLabelText('Name text field');

    fireEvent.change(nameField, { target: { value: name } });
    fireEvent.click(screen.getByText(`Create ${name}`));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=createbranch&root=${rootDir}&name=${name}`);
  });

  it('handle create stash', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const nameField = screen.getByLabelText('Name text field');

    fireEvent.change(nameField, { target: { value: name } });
    const createStashBtn = screen.getByText(`Create Stash ${name}`);
    fireEvent.click(createStashBtn);

    expect(api.get).toHaveBeenCalledWith(`/project/?type=createstash&root=${rootDir}&name=${name}`);
  });

  it('select stash', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const stashesBtn = screen.getByText('Stashes');
    fireEvent.click(stashesBtn);
    fireEvent.click(screen.getByText('stash{1}'));
    fireEvent.click(screen.getByText('Switch Stash 1'));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=selectstash&root=${rootDir}&name=1`);
  });

  it('handle reset', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const resetBtn = screen.getByText('Reset');
    fireEvent.click(resetBtn);

    expect(api.get).toHaveBeenCalledWith(`/project/?type=resetbranch&root=${rootDir}`);
  });
});
