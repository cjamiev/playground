import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import TransformForm from './TransformForm';

const defaultProps = {
  style: {},
  onChange: jest.fn()
};

describe.skip('TransformForm', () => {
  it('update transform', () => {
    simpleTestWrapper(TransformForm, defaultProps);

    fireEvent.change(screen.getByLabelText('Rotate X range field'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Rotate Y range field'), { target: { value: '2' } });
    fireEvent.change(screen.getByLabelText('Rotate Z range field'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Translate X range field'), { target: { value: '4' } });
    fireEvent.change(screen.getByLabelText('Translate Y range field'), { target: { value: '5' } });
    fireEvent.change(screen.getByLabelText('Scale X range field'), { target: { value: '6' } });
    fireEvent.change(screen.getByLabelText('Scale Y range field'), { target: { value: '7' } });
    fireEvent.change(screen.getByLabelText('Skew X range field'), { target: { value: '8' } });
    fireEvent.change(screen.getByLabelText('Skew Y range field'), { target: { value: '9' } });
    fireEvent.click(screen.getByText('Remove Attribute'));
    fireEvent.click(screen.getByLabelText('Rotate Z dropdown option is not selected'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'rotateX', selected: '1' }],
      [{ id: 'rotateY', selected: '2' }],
      [{ id: 'rotateZ', selected: '3' }],
      [{ id: 'translateX', selected: '4' }],
      [{ id: 'translateY', selected: '5' }],
      [{ id: 'scaleX', selected: '6' }],
      [{ id: 'scaleY', selected: '7' }],
      [{ id: 'skewX', selected: '8' }],
      [{ id: 'skewY', selected: '9' }],
      [{ id: 'rotateZ', selected: '' }]
    ]);
  });
});
