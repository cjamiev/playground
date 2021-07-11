import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
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
    testRenderComponent(TextRenderer, defaultProps);
    const input = screen.getByLabelText('text-field');
    const expectedResult = { id: 1, selected: '123', error: false };

    fireEvent.change(input, { target: { value: '123' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });

  it('invalid text', () => {
    testRenderComponent(TextRenderer, defaultProps);
    const input = screen.getByLabelText('text-field');
    const expectedResult = { id: 1, selected: 'abc', error: true };

    fireEvent.change(input, { target: { value: 'abc' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});