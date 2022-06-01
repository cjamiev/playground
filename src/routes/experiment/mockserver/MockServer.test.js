import { fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import MockServer from './MockServer';
import { mockserverInitialState } from './mockserverReducer';

const pathname = '/mockserver';
const ZERO = 0;

const mockLogProps = {
  mockserver: mockserverInitialState
};

describe('MockServer', () => {
  it('tab switch', async () => {
    reduxTestWrapper(MockServer, {}, mockLogProps, pathname);

    expect(screen.queryByText('Filter URL:')).not.toBeInTheDocument();

    const viewTabBtn = screen.queryByText('View');
    fireEvent.click(viewTabBtn);
    expect(screen.queryByText('Filter URL:')).toBeInTheDocument();
  });
});
