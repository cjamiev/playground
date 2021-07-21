import { fireEvent, screen, waitFor } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import MockServer from './MockServer';
import { mockserverInitialState } from './mockserverReducer';

const pathname = '/mockserver';

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
    testRenderContainer(MockServer, {}, {}, pathname);

    expect(screen.getByText('Mock Server')).toBeInTheDocument();
  });

  it('tab switch', async () => {
    testRenderContainer(MockServer, {}, mockLogProps, pathname);

    expect(screen.queryByText('Filter URL:')).not.toBeInTheDocument();

    const viewTabBtn = screen.getByText('View Endpoints');
    fireEvent.click(viewTabBtn);
    expect(screen.getByText('Filter URL:')).toBeInTheDocument();
  });
});