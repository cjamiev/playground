import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import SelectRenderer from 'components/form/SelectRenderer';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: [{ label: 's1', selected: true}, { label: 's2', selected: false }],
  onChange: jest.fn()
};

describe('SelectRenderer', () => {
  it('checks an item', () => {
    testRenderComponent(SelectRenderer, defaultProps);
    const expectedResult = { id: 1, values: [{ label: 's1', selected: false}, { label: 's2', selected: true }] };

    fireEvent.change(screen.getByTestId('select-test-label'), {
      target: { value: 's2' }
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});