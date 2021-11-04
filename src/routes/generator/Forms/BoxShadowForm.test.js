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
    fireEvent.change(screen.getByLabelText('Horizontal range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Vertical range field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Blur Radius range field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Spread range field'), { target: { value: '4'}});
    fireEvent.change(screen.getByLabelText('Color color field has value #ffffff'), { target: { value: '#555555'}});

    fireEvent.click(screen.getAllByText('Yes')[ONE]);
    fireEvent.change(screen.getByLabelText('Secondary Horizontal range field'), { target: { value: '6'}});
    fireEvent.change(screen.getByLabelText('Secondary Vertical range field'), { target: { value: '7'}});
    fireEvent.change(screen.getByLabelText('Secondary Blur Radius range field'), { target: { value: '8'}});
    fireEvent.change(screen.getByLabelText('Secondary Spread range field'), { target: { value: '9'}});
    fireEvent.change(screen.getByLabelText('Secondary Color color field has value #ffffff'), { target: { value: '#aaaaaa'}});
    fireEvent.click(screen.getByText('Remove Second Shadow'));
    fireEvent.click(screen.getByText('Remove Both Shadows'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'insetBoxShadow', selected: 'inset'}],
      [{ id: 'horizontalBoxShadow', selected: '1'}],
      [{ id: 'verticalBoxShadow', selected: '2'}],
      [{ id: 'blurRadiusBoxShadow', selected: '3'}],
      [{ id: 'spreadBoxShadow', selected: '4'}],
      [{ id: 'colorBoxShadow', selected: '#555555'}],
      [{ id: 'secondaryInsetBoxShadow', selected: 'inset'}],
      [{ id: 'secondaryHorizontalBoxShadow', selected: '6'}],
      [{ id: 'secondaryVerticalBoxShadow', selected: '7'}],
      [{ id: 'secondaryBlurRadiusBoxShadow', selected: '8'}],
      [{ id: 'secondarySpreadBoxShadow', selected: '9'}],
      [{ id: 'secondaryColorBoxShadow', selected: '#aaaaaa'}],
      [{ id: 'secondaryHorizontalBoxShadow', selected: ''}],
      [{ id: 'horizontalBoxShadow', selected: ''}]
    ]);
  });
});
