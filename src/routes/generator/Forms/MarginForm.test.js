import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import MarginForm from './MarginForm';

const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('MarginForm', () => {
  it('update margin', () => {
    simpleTestWrapper(MarginForm, defaultProps);

    fireEvent.change(screen.getByLabelText('Margin text field'), { target: { value: '1'}});

    expect(defaultProps.onChange).toHaveBeenCalledWith({ error: false, id: 'margin', selected: '1'});
  });

  it('update margin by segement', () => {
    simpleTestWrapper(MarginForm, defaultProps);

    fireEvent.click(screen.getByText('No'));

    fireEvent.change(screen.getByLabelText('Top text field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Right text field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Bottom text field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Left text field'), { target: { value: '4'}});

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'marginTop', selected: ''}],
      [{ id: 'marginRight', selected: ''}],
      [{ id: 'marginBottom', selected: ''}],
      [{ id: 'marginLeft', selected: ''}],
      [{ id: 'margin', selected: ''}],
      [{ error: false, id: 'marginTop', selected: '1'}],
      [{ error: false, id: 'marginRight', selected: '2'}],
      [{ error: false, id: 'marginBottom', selected: '3'}],
      [{ error: false, id: 'marginLeft', selected: '4'}]
    ]);
  });
});
