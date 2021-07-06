import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import Alert from './Alert';

const data = {
  content: 'test-content',
  status: 'error'
};
const alertStoreProps = {
  alert: {
    queue: [data]
  }
};

describe('Alert', () => {
  it('checks alert renders', async () => {
    testRenderContainer(Alert, {}, alertStoreProps);

    expect(screen.getByText(data.content)).toBeInTheDocument();
  });

  it('should not be rendered', async () => {
    testRenderContainer(Alert);

    expect(screen.queryByText(data.content)).not.toBeInTheDocument();
  });
});