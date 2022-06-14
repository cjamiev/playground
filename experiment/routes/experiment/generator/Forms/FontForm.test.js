import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import FontForm from './FontForm';

const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('FontForm', () => {
  it('update font', () => {
    simpleTestWrapper(FontForm, defaultProps);

    fireEvent.click(screen.getByText('Alignment'));
    fireEvent.click(screen.getByText('left'));
    fireEvent.change(screen.getByLabelText('Size range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Color color field'), { target: { value: '#555555'}});
    fireEvent.click(screen.getByText('Remove Attribute'));
    fireEvent.click(screen.getByLabelText('Alignment dropdown option is not selected'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'textAlign', values: [
        { label: 'initial', selected: false },
        { label: 'left', selected: true },
        { label: 'right', selected: false },
        { label: 'center', selected: false },
        { label: 'justify', selected: false }
      ]}],
      [{ id: 'fontSize', selected: '1'}],
      [{ id: 'fontColor', selected: '#555555'}],
      [{ id: 'textAlign', selected: ''}]
    ]);
  });
});
