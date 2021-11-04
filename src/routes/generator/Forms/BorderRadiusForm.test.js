import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import BorderRadiusForm from './BorderRadiusForm';

const defaultProps = {
  style : {},
  onChange: jest.fn()
};

describe('BorderRadiusForm', () => {
  it('update border radius', () => {
    simpleTestWrapper(BorderRadiusForm, defaultProps);

    fireEvent.change(screen.getByLabelText('Radius text field'), { target: { value: '1'}});

    expect(defaultProps.onChange).toHaveBeenCalledWith({ error: false, id: 'borderRadius', selected: '1'});
  });

  it('update border radius by segement', () => {
    simpleTestWrapper(BorderRadiusForm, defaultProps);

    fireEvent.click(screen.getByText('No'));

    fireEvent.change(screen.getByLabelText('Top Left text field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Top Right text field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Bottom Right text field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Bottom Left text field'), { target: { value: '4'}});

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'topLeftRadius', selected: ''}],
      [{ id: 'topRightRadius', selected: ''}],
      [{ id: 'bottomRightRadius', selected: ''}],
      [{ id: 'bottomLeftRadius', selected: ''}],
      [{ id: 'borderRadius', selected: ''}],
      [{ error: false, id: 'topLeftRadius', selected: '1'}],
      [{ error: false, id: 'topRightRadius', selected: '2'}],
      [{ error: false, id: 'bottomRightRadius', selected: '3'}],
      [{ error: false, id: 'bottomLeftRadius', selected: '4'}]
    ]);
  });
});
