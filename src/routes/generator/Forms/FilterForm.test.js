import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import FilterForm from './FilterForm';

const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('FilterForm', () => {
  it('update filter', () => {
    simpleTestWrapper(FilterForm, defaultProps);

    fireEvent.change(screen.getByLabelText('Blur text field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Brightness text field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Contrast text field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Grayscale text field'), { target: { value: '4'}});
    fireEvent.change(screen.getByLabelText('Hue Rotate text field'), { target: { value: '5'}});
    fireEvent.change(screen.getByLabelText('Invert text field'), { target: { value: '6'}});
    fireEvent.change(screen.getByLabelText('Opacity text field'), { target: { value: '7'}});
    fireEvent.change(screen.getByLabelText('Saturate text field'), { target: { value: '8'}});
    fireEvent.change(screen.getByLabelText('Sepia text field'), { target: { value: '9'}});

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ error: false, id: 'blur', selected: '1'}],
      [{ error: false, id: 'brightness', selected: '2'}],
      [{ error: false, id: 'contrast', selected: '3'}],
      [{ error: false, id: 'grayscale', selected: '4'}],
      [{ error: false, id: 'hueRotate', selected: '5'}],
      [{ error: false, id: 'invert', selected: '6'}],
      [{ error: false, id: 'filterOpacity', selected: '7'}],
      [{ error: false, id: 'saturate', selected: '8'}],
      [{ error: false, id: 'sepia', selected: '9'}]
    ]);
  });
});
