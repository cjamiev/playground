import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import BorderForm from './BorderForm';

const defaultProps = {
  style : {
    borderColor: '#000000',
    borderStyle: 'solid',
    borderThickness: '1'
  },
  onChange: jest.fn()
};

describe('BorderForm', () => {
  it('update border', () => {
    simpleTestWrapper(BorderForm, defaultProps);

    expect(screen.queryByText('Border Type solid')).toBeInTheDocument();
  });

  it('handle remove', () => {
    simpleTestWrapper(BorderForm, defaultProps);

    fireEvent.click(screen.getByText('Remove'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'borderStyle', selected: '' }],
      [{ id: 'borderThickness', selected: '' }],
      [{ id: 'borderColor', selected: '' }]
    ]);
  });
});
