import { fireEvent, screen, waitFor } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import api from 'api';
import MockViewEndpoint from './MockViewEndpoint';

const mockViewEndpointProps = {
  mockserver: {
    mocks: [{ method: 'GET', url: '/test', responsePath: 'filename' }],
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
};

describe('MockViewEndpoint', () => {
  it('checks page renders', () => {
    testRenderContainer(MockViewEndpoint, {}, mockViewEndpointProps );

    expect(screen.getByText('Filter URL:')).toBeInTheDocument();
  });

  it('click load then click copy content', async () => {
    document.execCommand = jest.fn();
    const mockResponse = {
      response: {
        body: {
          testing: 123
        },
        headers: {
        }
      },
      request: {
        url: '/test',
        method: 'GET',
        responsePath: 'filename'
      }
    };
    testRenderContainer(MockViewEndpoint, {}, {...mockViewEndpointProps, mockserver: {...mockViewEndpointProps.mockserver, mockResponse} });

    const loadBtn = screen.getByText('Load');
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
        headers: {
        }
      },
      request: {
        url: '/test',
        method: 'GET',
        responsePath: 'filename'
      }
    };
    testRenderContainer(MockViewEndpoint, {}, {...mockViewEndpointProps, mockserver: {...mockViewEndpointProps.mockserver, mockResponse} });

    const loadBtn = screen.getByText('Load');
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
        headers: {
        }
      },
      request: {
        url: '/test',
        method: 'GET',
        responsePath: 'filename'
      }
    };
    testRenderContainer(MockViewEndpoint, {}, {...mockViewEndpointProps, mockserver: {...mockViewEndpointProps.mockserver, mockResponse} });

    const loadBtn = screen.getByText('Load');
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
        headers: {
        }
      },
      request: {
        url: '/test',
        method: 'GET',
        responsePath: 'filename'
      }
    };
    testRenderContainer(MockViewEndpoint, {}, {...mockViewEndpointProps, mockserver: {...mockViewEndpointProps.mockserver, mockResponse} });

    const loadBtn = screen.getByText('Load');
    fireEvent.click(loadBtn);

    await waitFor(() => expect(screen.getByText('View Endpoint Details')));

    const uploadBtn = screen.getByText('Update');
    fireEvent.click(uploadBtn);
  });
});