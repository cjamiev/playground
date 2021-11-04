import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import BoxShadowForm from './BoxShadowForm';

const ZERO = 0;
const ONE = 1;
const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('BoxShadowForm', () => {
  it('update box shadow', () => {
    simpleTestWrapper(BoxShadowForm, defaultProps);

    fireEvent.click(screen.getAllByText('Yes')[ZERO]);
    fireEvent.change(screen.getByLabelText('Horizontal text field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Vertical text field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Blur Radius text field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Spread text field'), { target: { value: '4'}});
    fireEvent.change(screen.getByLabelText('Color color field has value #ffffff'), { target: { value: '#555555'}});

    fireEvent.click(screen.getAllByText('Yes')[ONE]);
    fireEvent.change(screen.getByLabelText('Secondary Horizontal text field'), { target: { value: '6'}});
    fireEvent.change(screen.getByLabelText('Secondary Vertical text field'), { target: { value: '7'}});
    fireEvent.change(screen.getByLabelText('Secondary Blur Radius text field'), { target: { value: '8'}});
    fireEvent.change(screen.getByLabelText('Secondary Spread text field'), { target: { value: '9'}});
    fireEvent.change(screen.getByLabelText('Secondary Color color field has value #ffffff'), { target: { value: '#aaaaaa'}});

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'insetBoxShadow', selected: 'inset'}],
      [{ error: false, id: 'horizontalBoxShadow', selected: '1'}],
      [{ error: false, id: 'verticalBoxShadow', selected: '2'}],
      [{ error: false, id: 'blurRadiusBoxShadow', selected: '3'}],
      [{ error: false, id: 'spreadBoxShadow', selected: '4'}],
      [{ id: 'colorBoxShadow', selected: '#555555'}],
      [{ id: 'secondaryInsetBoxShadow', selected: 'inset'}],
      [{ error: false, id: 'secondaryHorizontalBoxShadow', selected: '6'}],
      [{ error: false, id: 'secondaryVerticalBoxShadow', selected: '7'}],
      [{ error: false, id: 'secondaryBlurRadiusBoxShadow', selected: '8'}],
      [{ error: false, id: 'secondarySpreadBoxShadow', selected: '9'}],
      [{ id: 'secondaryColorBoxShadow', selected: '#aaaaaa'}]
    ]);
  });
});
