import { fireEvent, screen } from '@testing-library/react';
import { simpleTestWrapper } from 'testHelper';
import Button from './Button';

const defaultProps = {
  label: 'test-label',
  onClick: jest.fn()
};

describe('Button', () => {
  it('handle click', async () => {
    simpleTestWrapper(Button, defaultProps);

    fireEvent.click(screen.getByText(defaultProps.label));
    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it('should be disabled', async () => {
    simpleTestWrapper(Button, { ...defaultProps, disabled: true});

    fireEvent.click(screen.getByText(defaultProps.label));
    expect(defaultProps.onClick).not.toHaveBeenCalled();
  });

  it('should render className', () => {
    simpleTestWrapper(Button, { ...defaultProps, className: 'test--class'});

    expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
  });
});