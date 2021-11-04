import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import BorderForm from './BorderForm';

const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('BorderForm', () => {
  it('update border', () => {
    simpleTestWrapper(BorderForm, defaultProps);

    fireEvent.click(screen.getByText('Border Type'));
    fireEvent.click(screen.getByText('solid'));
    fireEvent.change(screen.getByLabelText('Thickness range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Color color field'), { target: { value: '#555555'}});
    fireEvent.click(screen.getByText('Remove'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'borderStyle', values: [
        { label: 'solid', selected: true },
        { label: 'dotted', selected: false },
        { label: 'dashed', selected: false },
        { label: 'double', selected: false },
        { label: 'groove', selected: false },
        { label: 'ridge', selected: false },
        { label: 'inset', selected: false },
        { label: 'outset', selected: false },
        { label: 'none', selected: false }
      ]}],
      [{ id: 'borderThickness', selected: '1'}],
      [{ id: 'borderColor', selected: '#555555'}],
      [{ id: 'borderStyle', selected: ''}],
      [{ id: 'borderThickness', selected: ''}],
      [{ id: 'borderColor', selected: ''}]
    ]);
  });
});
