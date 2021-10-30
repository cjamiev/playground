import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, mockStore, mockApi, mockGet, mockPost } from 'testHelper';
import api from 'api';
import Config from './Config';

const ZERO = 0;
const defaultStoreProps = {
  global: mockStore.global,
  config: mockStore.config
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
});
