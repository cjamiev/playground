import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import Alert from './Alert';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

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

  it('handle dismiss', async () => {
    testRenderContainer(Alert, {}, alertStoreProps);

    fireEvent.click(screen.getByText('X'));

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should not be rendered', async () => {
    testRenderContainer(Alert);

    expect(screen.queryByText(data.content)).not.toBeInTheDocument();
  });
});