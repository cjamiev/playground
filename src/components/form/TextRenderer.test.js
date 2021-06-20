import { fireEvent } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import TextRenderer from 'components/form/TextRenderer';

const defaultProps = {
  id: 1,
  label: 'test-label',
  regex: '[0-9]+',
  error: false,
  errorMessage: 'Please enter a valid number',
  onChange: jest.fn()
};

describe('TextRenderer', () => {
  it('valid text', () => {
    const { getByLabelText } = testRenderComponent(TextRenderer, defaultProps);
    const input = getByLabelText('text-field');
    const expectedResult = { id: 1, selected: '123', error: false };

    fireEvent.change(input, { target: { value: '123' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('invalid text', () => {
    const { getByLabelText } = testRenderComponent(TextRenderer, defaultProps);
    const input = getByLabelText('text-field');
    const expectedResult = { id: 1, selected: 'abc', error: true };

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});