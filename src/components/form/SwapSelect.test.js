import { fireEvent } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import SwapSelect from 'components/form/SwapSelect';

const defaultProps = {
  listOneLabel: 'test-label-one',
  listTwoLabel: 'test-label-two',
  listOne: [{ label: '1', selected: false}, { label: '2', selected: false }],
  listTwo: [],
  onChange: jest.fn()
};

describe('SwapSelect', () => {
  it('swapRight', () => {
    const { getByTestId, getByText } = testRenderComponent(SwapSelect, defaultProps);

    fireEvent.change(getByTestId('multiselect-test-label-one'), {
      target: { value: ['1'] }
    });
    fireEvent.click(getByText('>>'));

    expect(defaultProps.onChange).toHaveBeenCalledWith([{ label: '2', selected: false }], [{ label: '1', selected: true }]);
  });

  it('swapLeft', () => {
    const updatedProps = {
      ...defaultProps,
      listOne: [],
      listTwo: [{ label: '1', selected: false}, { label: '2', selected: false }]
    };
    const { getByTestId, getByText } = testRenderComponent(SwapSelect, updatedProps);

    fireEvent.change(getByTestId('multiselect-test-label-two'), {
      target: { value: ['2'] }
    });
    fireEvent.click(getByText('<<'));

    expect(defaultProps.onChange).toHaveBeenCalledWith([{ label: '2', selected: true }], [{ label: '1', selected: false }]);
  });
});