import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import MarginPaddingForm from './MarginPaddingForm';

const ZERO = 0;
const ONE = 1;
const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('MarginPaddingForm', () => {
  it('update margin', () => {
    simpleTestWrapper(MarginPaddingForm, defaultProps);

    fireEvent.click(screen.getAllByText('No')[ZERO]);
    fireEvent.change(screen.getByLabelText('Top range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Right range field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Bottom range field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Left range field'), { target: { value: '4'}});

    fireEvent.click(screen.getAllByText('Yes')[ZERO]);
    fireEvent.change(screen.getByLabelText('Margin range field'), { target: { value: '1'}});

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'marginTop', selected: ''}],
      [{ id: 'marginRight', selected: ''}],
      [{ id: 'marginBottom', selected: ''}],
      [{ id: 'marginLeft', selected: ''}],
      [{ id: 'margin', selected: ''}],
      [{ id: 'marginTop', selected: '1'}],
      [{ id: 'marginRight', selected: '2'}],
      [{ id: 'marginBottom', selected: '3'}],
      [{ id: 'marginLeft', selected: '4'}],
      [{ id: 'marginTop', selected: ''}],
      [{ id: 'marginRight', selected: ''}],
      [{ id: 'marginBottom', selected: ''}],
      [{ id: 'marginLeft', selected: ''}],
      [{ id: 'margin', selected: '1'}]
    ]);

  });

  it('update padding', () => {
    simpleTestWrapper(MarginPaddingForm, defaultProps);

    fireEvent.click(screen.getAllByText('No')[ONE]);
    fireEvent.change(screen.getByLabelText('Top range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Right range field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Bottom range field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Left range field'), { target: { value: '4'}});

    fireEvent.click(screen.getAllByText('Yes')[ONE]);
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
