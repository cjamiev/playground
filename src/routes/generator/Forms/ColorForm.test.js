import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import ColorForm from './ColorForm';

const ZERO = 0;
const ONE = 1;
const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('ColorForm', () => {
  it('update box shadow', () => {
    simpleTestWrapper(ColorForm, defaultProps);

    fireEvent.change(screen.getByLabelText('BG Color color field has value #ffffff'), { target: { value: '#555555'}});
    fireEvent.change(screen.getByLabelText('Opacity range field'), { target: { value: '50'}});
    fireEvent.click(screen.getByText('Remove'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'backgroundColor', selected: '#555555'}],
      [{ id: 'opacity', selected: '50'}],
      [{ id: 'backgroundColor', selected: ''}]
    ]);
  });
});
