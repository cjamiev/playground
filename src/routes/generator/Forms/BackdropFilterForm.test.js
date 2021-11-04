import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import BackdropFilterForm from './BackdropFilterForm';

const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('BackdropFilterForm', () => {
  it('update border', () => {
    simpleTestWrapper(BackdropFilterForm, defaultProps);

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
      [{ error: false, id: 'backdropBlur', selected: '1'}],
      [{ error: false, id: 'backdropBrightness', selected: '2'}],
      [{ error: false, id: 'backdropContrast', selected: '3'}],
      [{ error: false, id: 'backdropGrayscale', selected: '4'}],
      [{ error: false, id: 'backdropHueRotate', selected: '5'}],
      [{ error: false, id: 'backdropInvert', selected: '6'}],
      [{ error: false, id: 'backdropOpacity', selected: '7'}],
      [{ error: false, id: 'backdropSaturate', selected: '8'}],
      [{ error: false, id: 'backdropSepia', selected: '9'}]
    ]);
  });
});
