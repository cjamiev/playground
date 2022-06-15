import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import FilterForm from './FilterForm';

const defaultProps = {
  style: {},
  onChange: jest.fn()
};

describe.skip('FilterForm', () => {
  it('update filter', () => {
    simpleTestWrapper(FilterForm, defaultProps);

    fireEvent.change(screen.getByLabelText('Blur range field'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Brightness range field'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Contrast range field'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Grayscale range field'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Hue Rotate range field'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('Invert range field'), { target: { value: '6' } });
    fireEvent.change(screen.getByLabelText('Opacity range field'), { target: { value: '7' } });
    fireEvent.change(screen.getByLabelText('Saturate range field'), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText('Sepia range field'), { target: { value: '9' } });
    fireEvent.click(screen.getByText('Remove Attribute'));
    fireEvent.click(screen.getByLabelText('Opacity dropdown option is not selected'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'blur', selected: '1' }],
      [{ id: 'brightness', selected: '2' }],
      [{ id: 'contrast', selected: '3' }],
      [{ id: 'grayscale', selected: '4' }],
      [{ id: 'hueRotate', selected: '5' }],
      [{ id: 'invert', selected: '6' }],
      [{ id: 'filterOpacity', selected: '7' }],
      [{ id: 'saturate', selected: '8' }],
      [{ id: 'sepia', selected: '9' }],
      [{ id: 'filterOpacity', selected: '' }]
    ]);
  });
});
