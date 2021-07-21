import { fireEvent, screen } from '@testing-library/react';
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
  it('checks alert renders', () => {
    testRenderContainer(Alert, {}, alertStoreProps);

    expect(screen.getByText(data.content)).toBeInTheDocument();
  });

  it('handle dismiss', () => {
    testRenderContainer(Alert, {}, alertStoreProps);

    expect(screen.getByText(data.content)).toBeInTheDocument();
    fireEvent.click(screen.getByText('X'));

    expect(screen.queryByText(data.content)).not.toBeInTheDocument();
  });

  it('should not be rendered', () => {
    testRenderContainer(Alert);

    expect(screen.queryByText(data.content)).not.toBeInTheDocument();
  });
});