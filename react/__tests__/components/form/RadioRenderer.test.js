import { fireEvent } from '@testing-library/react';
import { testRenderComponent } from 'testHelper/componentSetup';
import RadioRenderer from 'components/form/RadioRenderer';

const defaultProps = {
  id: 1,
  label: 'test-label',
  values: ['rb1', 'rb2'],
  onChange: jest.fn()
};

describe('RadioRenderer', () => {
  it('checks an item', () => {
    const { getByLabelText } = testRenderComponent(RadioRenderer, defaultProps);
    const expectedResult = { id: 1, selected: 'rb1' };

    fireEvent.click(getByLabelText('rb1'));

    expect(defaultProps.onChange).toHaveBeenCalledWith(expectedResult);
  });
});