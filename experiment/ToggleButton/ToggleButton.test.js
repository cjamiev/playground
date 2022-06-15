import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import ToggleButton from './ToggleButton';

const defaultProps = {
  onClick: jest.fn()
};

describe('ToggleButton', () => {
  it('handle click', () => {
    simpleTestWrapper(ToggleButton, defaultProps);

    fireEvent.click(screen.getByLabelText('toggle'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});
