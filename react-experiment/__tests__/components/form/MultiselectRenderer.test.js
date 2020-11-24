import { fireEvent } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import MultiselectRenderer from 'components/form/MultiselectRenderer';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: ['ms1', 'ms2'],
  onChange: jest.fn()
};

describe('MultiselectRenderer', () => {
  it('checks an item', () => {
    const { getByTestId } = testRenderComponent(MultiselectRenderer, defaultProps);
    const expectedResult = { id: 1, selected: ['ms2'] };

    fireEvent.change(getByTestId('multiselect-test-label'), {
      target: { value: ['ms2'] }
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});