import { fireEvent } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import TextAreaRenderer from 'components/form/TextAreaRenderer';

const defaultProps = {
  id: 1,
  label: 'test-label',
  jsonType: true,
  selected: '{}',
  error: false,
  errorMessage: 'Please enter valid json',
  onChange: jest.fn()
};

describe('TextAreaRenderer', () => {
  it('valid json', () => {
    const { getByLabelText } = testRenderComponent(TextAreaRenderer, defaultProps);
    const input = getByLabelText('text-area');
    const expectedResult = { id: 1, selected: '{\"testing\":123}', error: false };

    fireEvent.change(input, { target: { value: '{\"testing\":123}' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('invalid json', () => {
    const { getByLabelText } = testRenderComponent(TextAreaRenderer, defaultProps);
    const input = getByLabelText('text-area');
    const expectedResult = { id: 1, selected: 'abc', error: true };

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});