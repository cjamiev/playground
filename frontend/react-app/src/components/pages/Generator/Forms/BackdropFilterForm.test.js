import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import BackdropFilterForm from './BackdropFilterForm';

const defaultProps = {
  style: {},
  onChange: jest.fn()
};

describe.skip('BackdropFilterForm', () => {
  it('update backdrop filter', () => {
    simpleTestWrapper(BackdropFilterForm, defaultProps);

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
      [{ id: 'backdropBlur', selected: '1' }],
      [{ id: 'backdropBrightness', selected: '2' }],
      [{ id: 'backdropContrast', selected: '3' }],
      [{ id: 'backdropGrayscale', selected: '4' }],
      [{ id: 'backdropHueRotate', selected: '5' }],
      [{ id: 'backdropInvert', selected: '6' }],
      [{ id: 'backdropOpacity', selected: '7' }],
      [{ id: 'backdropSaturate', selected: '8' }],
      [{ id: 'backdropSepia', selected: '9' }],
      [{ id: 'backdropOpacity', selected: '' }]
    ]);
  });
});
