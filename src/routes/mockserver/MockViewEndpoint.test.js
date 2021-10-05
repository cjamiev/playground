import { fireEvent, screen, waitFor } from '@testing-library/react';
import { reduxTestWrapper, fullTestWrapper } from 'testHelper';
import MockViewEndpoint from './MockViewEndpoint';

const ZERO = 0;

const mockViewEndpointProps = {
  mockserver: {
    mocks: [
      { method: 'GET', url: '/test', responsePath: 'filename' },
      { method: 'POST', url: '/test2', responsePath: 'filename2' }
    ],
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
};

describe('MockViewEndpoint', () => {
  it('handles filter', () => {
    reduxTestWrapper(MockViewEndpoint, {}, mockViewEndpointProps);

    expect(screen.queryByText(mockViewEndpointProps.mockserver.mocks[ZERO].url)).toBeInTheDocument();

    const input = screen.getByLabelText('Filter URL: text field');
    fireEvent.change(input, { target: { value: 'apple' } });
    expect(screen.queryByText(mockViewEndpointProps.mockserver.mocks[ZERO].url)).not.toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'test' } });
    expect(screen.queryByText(mockViewEndpointProps.mockserver.mocks[ZERO].url)).toBeInTheDocument();
  });

  it('click load then click copy content', async () => {
    document.execCommand = jest.fn();
    const mockResponse = {
      response: {
        body: {
          testing: 123
        },
        headers: {}
      },
      request: {
        url: '/test',
        method: 'GET',
        responsePath: 'filename'
      }
    };
    fullTestWrapper(
      MockViewEndpoint,
      {},
      { ...mockViewEndpointProps, mockserver: { ...mockViewEndpointProps.mockserver, mockResponse } }
    );

    const loadBtn = screen.getAllByText('Load')[ZERO];
    fireEvent.click(loadBtn);

    await waitFor(() => expect(screen.getByText('View Endpoint Details')));

    const copyContentBtn = screen.getByText('Copy Content');
    fireEvent.click(copyContentBtn);
    expect(document.execCommand).toHaveBeenCalled();
  });

  it('click load then click copy response', async () => {
    document.execCommand = jest.fn();
    const mockResponse = {
      response: {
        body: {
          testing: 123
        },
        headers: {}
      },
      request: {
        url: '/test',
        method: 'GET',
        responsePath: 'filename'
      }
    };
    fullTestWrapper(
      MockViewEndpoint,
      {},
      { ...mockViewEndpointProps, mockserver: { ...mockViewEndpointProps.mockserver, mockResponse } }
    );

    const loadBtn = screen.getAllByText('Load')[ZERO];
    fireEvent.click(loadBtn);

    await waitFor(() => expect(screen.getByText('View Endpoint Details')));

    const copyResponseBtn = screen.getByText('Copy Response');
    fireEvent.click(copyResponseBtn);
    expect(document.execCommand).toHaveBeenCalled();
  });

  it('click load then click delete', async () => {
    document.execCommand = jest.fn();
    const mockResponse = {
      response: {
        body: {
          testing: 123
        },
        headers: {}
      },
      request: {
        url: '/test',
        method: 'GET',
        responsePath: 'filename'
      }
    };
    fullTestWrapper(
      MockViewEndpoint,
      {},
      { ...mockViewEndpointProps, mockserver: { ...mockViewEndpointProps.mockserver, mockResponse } }
    );

    const loadBtn = screen.getAllByText('Load')[ZERO];
    fireEvent.click(loadBtn);

    await waitFor(() => expect(screen.getByText('View Endpoint Details')));

    const deleteBtn = screen.getByText('Delete');
    fireEvent.click(deleteBtn);
  });

  it('click load then click upload', async () => {
    document.execCommand = jest.fn();
    const mockResponse = {
      response: {
        body: {
          testing: 123
        },
        headers: {}
      },
      request: {
        url: '/test',
        method: 'GET',
        responsePath: 'filename'
      }
    };
    fullTestWrapper(
      MockViewEndpoint,
      {},
      { ...mockViewEndpointProps, mockserver: { ...mockViewEndpointProps.mockserver, mockResponse } }
    );

    const loadBtn = screen.getAllByText('Load')[ZERO];
    fireEvent.click(loadBtn);

    await waitFor(() => expect(screen.getByText('View Endpoint Details')));

    const uploadBtn = screen.getByText('Update');
    fireEvent.click(uploadBtn);
  });
});
