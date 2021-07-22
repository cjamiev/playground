import { fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import MockServer from './MockServer';
import { mockserverInitialState } from './mockserverReducer';

const pathname = '/mockserver';
const ZERO = 0;

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
    reduxTestWrapper(MockServer, {}, {}, pathname);

    expect(screen.getAllByText('Mock Server')[ZERO]).toBeInTheDocument();
  });

  it('tab switch', async () => {
    reduxTestWrapper(MockServer, {}, mockLogProps, pathname);

    expect(screen.queryByText('Filter URL:')).not.toBeInTheDocument();

    const viewTabBtn = screen.getByText('View Endpoints');
    fireEvent.click(viewTabBtn);
    expect(screen.getByText('Filter URL:')).toBeInTheDocument();
  });
});