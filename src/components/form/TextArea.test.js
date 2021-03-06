import { fireEvent } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import TextArea from 'components/form/TextArea';

const defaultProps = {
  id: 1,
  label: 'test-label',
  jsonType: true,
  selected: '{}',
  error: false,
  errorMessage: 'Please enter valid json',
  onChange: jest.fn()
};

describe('TextArea', () => {
  it('valid json', () => {
    const { getByLabelText } = testRenderComponent(TextArea, defaultProps);
    const input = getByLabelText('text-area');
    const expectedResult = { id: 1, selected: JSON.stringify({testing:123}, undefined, 2), error: false, errorMessage: defaultProps.errorMessage };

    fireEvent.change(input, { target: { value: '{\"testing\":123}' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('invalid json', () => {
    const { getByLabelText } = testRenderComponent(TextArea, defaultProps);
    const input = getByLabelText('text-area');
    const expectedResult = { id: 1, selected: 'abc', error: true, errorMessage: defaultProps.errorMessage };

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});