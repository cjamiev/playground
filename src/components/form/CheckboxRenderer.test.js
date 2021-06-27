import { fireEvent } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import CheckboxRenderer from 'components/form/CheckboxRenderer';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: ['ck1', 'ck2'],
  selected: ['ck2'],
  onChange: jest.fn()
};

describe('CheckboxRenderer', () => {
  it('checks an item', () => {
    const { getByLabelText } = testRenderComponent(CheckboxRenderer, defaultProps);
    const expectedResult = { id: 1, selected: ['ck2', 'ck1'] };

    fireEvent.click(getByLabelText('ck1'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('unchecks an item', () => {
    const { getByLabelText } = testRenderComponent(CheckboxRenderer, defaultProps);
    const expectedResult = { id: 1, selected: [] };

    fireEvent.click(getByLabelText('ck2'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});