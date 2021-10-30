import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockStore, mockApi, mockGet, mockPost } from 'testHelper';
import api from 'api';
import Config from './Config';

const ZERO = 0;
const defaultStoreProps = {
  global: mockStore.global,
  config: mockStore.config,
  project: mockStore.project
};

const apiMock = mockApi(mockGet, mockPost);

describe('Config', () => {
  it('handle save', () => {
    reduxTestWrapper(Config, {}, defaultStoreProps);

    expect(screen.getByDisplayValue('commandLabelOne')).toBeInTheDocument();
    expect(screen.getByDisplayValue('commandLabelTwo')).toBeInTheDocument();
    expect(screen.getByText('N/A')).toBeInTheDocument();

    fireEvent.click(screen.getByText('No'));
    expect(screen.queryByText('N/A')).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue('commandThree')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Yes')[ZERO]);
    expect(screen.queryByDisplayValue('commandLabelOne')).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('commandThree text field'), { target: { value: 'commandLabelThree'}});
    fireEvent.click(screen.getByText('Save'));

    expect(api.post).toHaveBeenCalledWith('/db', { content: JSON.stringify({
      commands:[
        {label:'commandLabelThree',value:'commandThree'},
        {label:'commandLabelTwo',value:'commandTwo'}
      ]
    }), filename: 'config.json'});
  });

  it('handle delete directory', () => {
    reduxTestWrapper(Config, {}, defaultStoreProps);

    expect(screen.getByText('dir1')).toBeInTheDocument();
    expect(screen.getByText('dir2')).toBeInTheDocument();

    fireEvent.click(screen.getAllByLabelText('trash')[ZERO]);

    expect(api.post).toHaveBeenCalledWith('/db', { content: JSON.stringify({
      directories:['dir2'],
      regexes: mockStore.project.regexes
    }), filename: 'project.json'});
  });

  it('handle add directory', () => {
    reduxTestWrapper(Config, {}, defaultStoreProps);

    fireEvent.change(
      screen.getByLabelText('New Directory text field'),
      { target: { value: 'dir3'}}
    );
    fireEvent.click(screen.getByText('Add Directory'));

    expect(api.post).toHaveBeenCalledWith('/db', { content: JSON.stringify({
      directories: ['dir3','dir1', 'dir2'],
      regexes: mockStore.project.regexes
    }), filename: 'project.json'});
  });
});
