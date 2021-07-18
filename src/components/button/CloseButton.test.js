import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import CloseButton from './CloseButton';

const defaultProps = {
  onClick: jest.fn()
};

describe('CloseButton', () => {
  it('handle click', async () => {
    testRenderComponent(CloseButton, defaultProps);

    fireEvent.click(screen.getByText('X'));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
});