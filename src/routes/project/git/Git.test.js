import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockApi, mockGet, mockPost } from 'testHelper';
import Project from '../Project';
import api from 'api';

const apiMock = mockApi(mockGet, mockPost);

const ZERO = 0;
const rootDir = './';
const name = 'test-stash';
const defaultStoreProps = {
  project: {
    directories: [],
    regexes: [],
    remoteUrl: 'test-url',
    branches: ['branch1', 'branch2'],
    stashes: ['stash{1}', 'stash{2}'],
    packageJson: {},
    versions: {},
    message: ''
  }
};

// act warnings
describe.skip('Git', () => {
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

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=selectbranch&root=${rootDir}&name=branch1`);
  });

  it('delete branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const branchesBtn = screen.getByText('Branches');
    fireEvent.click(branchesBtn);
    fireEvent.click(screen.getByText('branch1'));
    fireEvent.click(screen.getByText('Delete branch1'));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=deletebranch&root=${rootDir}&name=branch1`);
  });

  it('merge branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const nameField = screen.getByLabelText('Name text field');

    fireEvent.change(nameField, { target: { value: name } });
    fireEvent.click(screen.getByText(`Merge ${name}`));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=mergebranch&root=${rootDir}&name=${name}`);
  });

  it('create branch', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const nameField = screen.getByLabelText('Name text field');

    fireEvent.change(nameField, { target: { value: name } });
    fireEvent.click(screen.getByText(`Create ${name}`));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=createbranch&root=${rootDir}&name=${name}`);
  });

  it('handle create stash', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const nameField = screen.getByLabelText('Name text field');

    fireEvent.change(nameField, { target: { value: name } });
    const createStashBtn = screen.getByText(`Create Stash ${name}`);
    fireEvent.click(createStashBtn);

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=createstash&root=${rootDir}&name=${name}`);
  });

  it('handle delete stash', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const nameField = screen.getByLabelText('Name text field');

    fireEvent.change(nameField, { target: { value: name } });
    const deleteStashBtn = screen.getByText(`Delete Stash ${name}`);
    fireEvent.click(deleteStashBtn);

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=deletestash&root=${rootDir}&name=${name}`);
  });

  it('select stash', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const stashesBtn = screen.getByText('Stashes');
    fireEvent.click(stashesBtn);
    fireEvent.click(screen.getByText('stash{1}'));
    fireEvent.click(screen.getByText('Switch Stash 1'));

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=selectstash&root=${rootDir}&name=1`);
  });

  it('handle reset', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const resetBtn = screen.getByText('Reset');
    fireEvent.click(resetBtn);

    expect(api.get).toHaveBeenCalledWith(`/project/?type=git&op=resetbranch&root=${rootDir}`);
  });
});
