import { fireEvent } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import SelectRenderer from 'components/form/SelectRenderer';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: ['dd1', 'dd2'],
  onChange: jest.fn()
};

describe('SelectRenderer', () => {
  it('checks an item', () => {
    const { getByTestId } = testRenderComponent(SelectRenderer, defaultProps);
    const expectedResult = { id: 1, selected: 'dd1' };

    fireEvent.change(getByTestId('select-test-label'), {
      target: { value: 'dd1' }
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});