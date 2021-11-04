import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import TextShadowForm from './TextShadowForm';

const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('TextShadowForm', () => {
  it('update text shadow', () => {
    simpleTestWrapper(TextShadowForm, defaultProps);

    fireEvent.change(screen.getByLabelText('Horizontal range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Vertical range field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Blur Radius range field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Color color field'), { target: { value: '#555555'}});
    fireEvent.click(screen.getByText('Remove'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'horizontalTextShadow', selected: '1'}],
      [{ id: 'verticalTextShadow', selected: '2'}],
      [{ id: 'blurRadiusTextShadow', selected: '3'}],
      [{ id: 'colorTextShadow', selected: '#555555'}],
      [{ id: 'horizontalTextShadow', selected: ''}]
    ]);
  });
});
