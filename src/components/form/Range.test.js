import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Range from 'components/form/Range';

const defaultProps = {
  id: 1,
  label: 'test-label',
  min: 0,
  max: 100,
  selected: '50',
  onChange: jest.fn()
};

describe('Range', () => {
  it('handle range change', () => {
    simpleTestWrapper(Range, defaultProps);
    const input = screen.getByLabelText('range-field');
    const expectedResult = { id: 1, selected: '75' };

    fireEvent.change(input, { target: { value: '75' } });

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});