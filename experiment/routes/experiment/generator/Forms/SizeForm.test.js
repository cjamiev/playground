import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import SizeForm from './SizeForm';

const defaultProps = {
  style: {},
  onChange: jest.fn()
};

describe.skip('SizeForm', () => {
  it('update size', () => {
    simpleTestWrapper(SizeForm, defaultProps);

    fireEvent.change(screen.getByLabelText('Width range field'), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText('Height range field'), { target: { value: '300' } });
    fireEvent.click(screen.getByText('Remove Width'));
    fireEvent.click(screen.getByText('Remove Height'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'width', selected: '200' }],
      [{ id: 'height', selected: '300' }],
      [{ id: 'width', selected: '' }],
      [{ id: 'height', selected: '' }]
    ]);
  });
});
