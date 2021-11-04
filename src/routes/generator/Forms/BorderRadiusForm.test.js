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

    fireEvent.click(screen.getByText('No'));
    fireEvent.change(screen.getByLabelText('Top Left range field'), { target: { value: '1'}});
    fireEvent.change(screen.getByLabelText('Top Right range field'), { target: { value: '2'}});
    fireEvent.change(screen.getByLabelText('Bottom Right range field'), { target: { value: '3'}});
    fireEvent.change(screen.getByLabelText('Bottom Left range field'), { target: { value: '4'}});

    fireEvent.click(screen.getByText('Yes'));
    fireEvent.change(screen.getByLabelText('Radius range field'), { target: { value: '5'}});

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'topLeftRadius', selected: ''}],
      [{ id: 'topRightRadius', selected: ''}],
      [{ id: 'bottomRightRadius', selected: ''}],
      [{ id: 'bottomLeftRadius', selected: ''}],
      [{ id: 'borderRadius', selected: ''}],
      [{ id: 'topLeftRadius', selected: '1'}],
      [{ id: 'topRightRadius', selected: '2'}],
      [{ id: 'bottomRightRadius', selected: '3'}],
      [{ id: 'bottomLeftRadius', selected: '4'}],
      [{ id: 'topLeftRadius', selected: ''}],
      [{ id: 'topRightRadius', selected: ''}],
      [{ id: 'bottomRightRadius', selected: ''}],
      [{ id: 'bottomLeftRadius', selected: ''}],
      [{ id: 'borderRadius', selected: '5'}]
    ]);
  });
});
