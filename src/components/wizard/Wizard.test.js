import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import Wizard from './Wizard';

const data = [
  (<div>content1</div>),
  (<div>content2</div>)
];
const defaultProps = {
  title: 'test-title',
  data,
  onSubmit: jest.fn()
};
const propsWithError = {
  ...defaultProps,
  hasError: true
};

describe('Wizard', () => {
  it('checks behavior', () => {
    reduxTestWrapper(Wizard, defaultProps);

    expect(screen.getByText('content1')).toBeInTheDocument();
    expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    expect(screen.queryByText('Submit')).not.toBeInTheDocument();
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(screen.getByText('content2')).toBeInTheDocument();
    expect(screen.queryByText('Next')).not.toBeInTheDocument();
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(defaultProps.onSubmit).toHaveBeenCalled();

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    expect(screen.getByText('content1')).toBeInTheDocument();
  });

  it('should not increment if hasError', () => {
    reduxTestWrapper(Wizard, propsWithError);

    expect(screen.getByText('content1')).toBeInTheDocument();
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    expect(screen.getByText('content1')).toBeInTheDocument();
  });
});