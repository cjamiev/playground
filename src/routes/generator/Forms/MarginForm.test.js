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

    fireEvent.click(screen.getByText('No'));
    fireEvent.change(screen.getByLabelText('Top range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Right range field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Bottom range field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Left range field'), { target: { value: '4'}});

    fireEvent.click(screen.getByText('Yes'));
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
});
