import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import Radio from 'components/form/Radio';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: [{ label: 'rb1', selected: true}, { label: 'rb2', selected: false }],
  onChange: jest.fn()
};

describe('Radio', () => {
  it('click an option', () => {
    testRenderComponent(Radio, defaultProps);
    const expectedResult = { id: 1, values: [{ label: 'rb1', selected: false}, { label: 'rb2', selected: true }] };

    fireEvent.click(screen.getByText('rb2'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});