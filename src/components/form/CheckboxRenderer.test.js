import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import CheckboxRenderer from 'components/form/CheckboxRenderer';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: [{ label: 'ck1', selected: true}, { label: 'ck2', selected: false }],
  onChange: jest.fn()
};

describe('CheckboxRenderer', () => {
  it('checks an item', () => {
    testRenderComponent(CheckboxRenderer, defaultProps);
    const expectedResult = { id: 1, values: [{ label: 'ck1', selected: true}, { label: 'ck2', selected: true }] };

    fireEvent.click(screen.getByText('ck2'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('unchecks an item', () => {
    const { getByText } = testRenderComponent(CheckboxRenderer, defaultProps);
    const expectedResult = { id: 1, values: [{ label: 'ck1', selected: false}, { label: 'ck2', selected: false }] };

    fireEvent.click(getByText('ck1'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});