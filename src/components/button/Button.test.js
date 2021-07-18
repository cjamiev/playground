import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import Button from './Button';

const defaultProps = {
  label: 'test-label',
  onClick: jest.fn()
};

describe('Button', () => {
  it('handle click', async () => {
    testRenderComponent(Button, defaultProps);

    fireEvent.click(screen.getByText(defaultProps.label));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should be disabled', async () => {
    testRenderComponent(Button, { ...defaultProps, disabled: true});

    fireEvent.click(screen.getByText(defaultProps.label));
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });
});