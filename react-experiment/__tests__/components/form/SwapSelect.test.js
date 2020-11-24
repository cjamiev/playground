import { fireEvent } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import SwapSelect from 'components/form/SwapSelect';

const defaultProps = {
  listOneLabel: 'test-label-one',
  listTwoLabel: 'test-label-two',
  listOne: ['1', '2'],
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

    expect(defaultProps.onChange).toHaveBeenCalledWith(['2'], ['1']);
  });

  it('swapLeft', () => {
    const updatedProps = {
      ...defaultProps,
      listOne: [],
      listTwo: ['1', '2']
    };
    const { getByTestId, getByText } = testRenderComponent(SwapSelect, updatedProps);

    fireEvent.change(getByTestId('multiselect-test-label-two'), {
      target: { value: ['2'] }
    });
    fireEvent.click(getByText('<<'));

    expect(updatedProps.onChange).toHaveBeenCalledWith(['2'], ['1']);
  });
});