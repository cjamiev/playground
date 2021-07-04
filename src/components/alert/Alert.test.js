import { screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import Alert from './Alert';

const defaultProps = {
  content: 'test-content',
  status: 'error'
};

describe('Alert', () => {
  it('checks alert renders', () => {
    testRenderComponent(Alert, defaultProps);

    expect(screen.getByText(defaultProps.content)).toBeInTheDocument();
  });
});