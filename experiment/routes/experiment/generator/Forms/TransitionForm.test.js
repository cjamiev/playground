import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import TransitionForm from './TransitionForm';

const defaultProps = {
  style : {
    transition: 'box-shadow 250ms ease-out 0ms, transform 250ms ease 0s'
  },
  onChange: jest.fn()
};

describe('TransitionForm', () => {
  it('update transition', () => {
    simpleTestWrapper(TransitionForm, defaultProps);

    fireEvent.click(screen.getByText('Edit'));
    fireEvent.click(screen.getByText('transform'));

    expect(screen.getByDisplayValue('250ms'));
    expect(screen.getByDisplayValue('0s'));

    fireEvent.click(screen.getByText('Timing Function ease'));
    fireEvent.click(screen.getByText('ease-in'));
    fireEvent.change(screen.getByLabelText('Property text field'), { target: { value: 'width'}});
    fireEvent.change(screen.getByLabelText('Duration text field'), { target: { value: '500ms'}});
    fireEvent.change(screen.getByLabelText('Delay text field'), { target: { value: '100ms'}});
    fireEvent.click(screen.getByText('Add'));

    fireEvent.click(screen.getByText('Remove'));
    fireEvent.click(screen.getByText('transform'));

    expect(defaultProps.onChange.mock.calls).toEqual([
      [{ id: 'transition', selected: 'box-shadow 250ms ease-out 0ms, transform 250ms ease 0s, width 500ms ease-in 100ms' }],
      [{ id: 'transition', selected: 'box-shadow 250ms ease-out 0ms' }]
    ]);
  });
});
