import { fireEvent, screen, waitFor } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import MockServer from './MockServer';
import { mockserverInitialState } from './mockserverReducer';

const mockHistory = {
  location: {
    pathname: '/mockserver'
  },
  push: jest.fn()
};
jest.mock('react-router-dom', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-router-dom'),
    useHistory: jest.fn(() => mockHistory)
  };
});

const mockLogProps = {
  mockserver: {
    ...mockserverInitialState,
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
};

describe('MockServer', () => {
  it('checks page renders', () => {
    testRenderContainer(MockServer);

    expect(screen.getByText('Mock Server')).toBeInTheDocument();
  });

  it('tab switch', async () => {
    testRenderContainer(MockServer, {}, mockLogProps);

    expect(screen.queryByText('Filter URL:')).not.toBeInTheDocument();

    const viewTabBtn = screen.getByText('View Endpoints');
    fireEvent.click(viewTabBtn);
    expect(screen.getByText('Filter URL:')).toBeInTheDocument();
  });
});