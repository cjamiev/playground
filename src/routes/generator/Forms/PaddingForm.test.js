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

    fireEvent.change(screen.getByLabelText('Padding text field'), { target: { value: '1'}});

    expect(defaultProps.onChange).toHaveBeenCalledWith({ error: false, id: 'padding', selected: '1'});
  });

  it('update padding by segement', () => {
    simpleTestWrapper(PaddingForm, defaultProps);

    fireEvent.click(screen.getByText('No'));

    fireEvent.change(screen.getByLabelText('Top text field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Right text field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Bottom text field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Left text field'), { target: { value: '4'}});

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'paddingTop', selected: ''}],
      [{ id: 'paddingRight', selected: ''}],
      [{ id: 'paddingBottom', selected: ''}],
      [{ id: 'paddingLeft', selected: ''}],
      [{ id: 'padding', selected: ''}],
      [{ error: false, id: 'paddingTop', selected: '1'}],
      [{ error: false, id: 'paddingRight', selected: '2'}],
      [{ error: false, id: 'paddingBottom', selected: '3'}],
      [{ error: false, id: 'paddingLeft', selected: '4'}]
    ]);
  });
});
