import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import OutlineForm from './OutlineForm';

const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('OutlineForm', () => {
  it('update outline', () => {
    simpleTestWrapper(OutlineForm, defaultProps);

    fireEvent.click(screen.getByText('Outline Type'));
    fireEvent.click(screen.getByText('solid'));
    fireEvent.change(screen.getByLabelText('Thickness range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Offset range field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Color color field'), { target: { value: '#555555'}});
    fireEvent.click(screen.getByText('Remove Attribute'));
    fireEvent.click(screen.getByLabelText('Offset dropdown option is not selected'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'outlineStyle', values: [
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
      [{ id: 'outlineThickness', selected: '1'}],
      [{ id: 'outlineOffset', selected: '2'}],
      [{ id: 'outlineColor', selected: '#555555'}],
      [{ id: 'outlineOffset', selected: ''}]
    ]);
  });
});
