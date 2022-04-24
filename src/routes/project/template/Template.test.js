import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockApi, mockGet, mockPost, mockStore } from 'testHelper';
import Project from '../Project';
import api from 'api';

const apiMock = mockApi(mockGet, mockPost);

const ZERO = 0;
const ONE = 1;
const rootDir = './';
const defaultStoreProps = {
  project: mockStore.project
};

// act warnings
describe.skip('Template', () => {
  it('Create Files from templates', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const templateTab = screen.getByText('Template');
    fireEvent.click(templateTab);

    const generatedNameField = screen.getByLabelText('Generated Name text field');
    const templateOneOption = screen.getByLabelText('templateOne checkbox option is not selected');
    const createBtn = screen.getByText('Create');

    fireEvent.change(generatedNameField, { target: { value: 'TestOne' } });
    fireEvent.click(templateOneOption);
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

  it('Load template file', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const templateTab = screen.getByText('Template');
    fireEvent.click(templateTab);

    const loadTemplateBtn = screen.getAllByText('templateOne')[ONE];
    fireEvent.click(loadTemplateBtn);

    const lastCallIndex = api.get.mock.calls.length - ONE;
    expect(api.get.mock.calls[lastCallIndex]).toEqual(['/project/?type=template&op=read&name=templateOne']);
  });

  it('Create new template file', () => {
    reduxTestWrapper(Project, {}, defaultStoreProps);

    const templateTab = screen.getByText('Template');
    fireEvent.click(templateTab);

    const templateNameField = screen.getByLabelText('Template Name text field');
    const templateTextField = screen.getByLabelText('Enter Content');
    const createNewBtn = screen.getByText('Create New');

    fireEvent.change(templateNameField, { target: { value: 'TestOne' } });
    fireEvent.change(templateTextField, { target: { value: 'TestOne Contents' } });
    fireEvent.click(createNewBtn);

    expect(api.post).toHaveBeenCalledWith('/project/?type=template&op=write&name=TestOne', JSON.stringify('TestOne Contents'));
  });
});
