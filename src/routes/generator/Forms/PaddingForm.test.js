import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import PaddingForm from './PaddingForm';

const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('PaddingForm', () => {
  it('update padding', () => {
    simpleTestWrapper(PaddingForm, defaultProps);

    fireEvent.click(screen.getByText('No'));
    fireEvent.change(screen.getByLabelText('Top range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Right range field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Bottom range field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Left range field'), { target: { value: '4'}});

    fireEvent.click(screen.getByText('Yes'));
    fireEvent.change(screen.getByLabelText('Padding range field'), { target: { value: '1'}});

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'paddingTop', selected: ''}],
      [{ id: 'paddingRight', selected: ''}],
      [{ id: 'paddingBottom', selected: ''}],
      [{ id: 'paddingLeft', selected: ''}],
      [{ id: 'padding', selected: ''}],
      [{ id: 'paddingTop', selected: '1'}],
      [{ id: 'paddingRight', selected: '2'}],
      [{ id: 'paddingBottom', selected: '3'}],
      [{ id: 'paddingLeft', selected: '4'}],
      [{ id: 'paddingTop', selected: ''}],
      [{ id: 'paddingRight', selected: ''}],
      [{ id: 'paddingBottom', selected: ''}],
      [{ id: 'paddingLeft', selected: ''}],
      [{ id: 'padding', selected: '1'}]
    ]);

  });
});
