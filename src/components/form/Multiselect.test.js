import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import Multiselect from 'components/form/Multiselect';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: [{ label: 'ms1', selected: true}, { label: 'ms2', selected: false }],
  onChange: jest.fn()
};

describe('Multiselect', () => {
  it('checks an item', () => {
    testRenderComponent(Multiselect, defaultProps);
    const expectedResult = { id: 1, values: [{ label: 'ms1', selected: false}, { label: 'ms2', selected: true }] };

    fireEvent.change(screen.getByTestId('multiselect-test-label'), {
      target: { value: ['ms2'] }
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});