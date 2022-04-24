import { fireEvent, screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { reduxTestWrapper, fullTestWrapper } from 'testHelper';
import api from 'api';
import MockLog from './MockLog';

const mockGet = jest.fn();
jest.mock('api');
api.get.mockResolvedValue({
  data: {
    data: [
      {
        timestamp: '7/10/2021 13:48:20',
        url: '/api/test',
        payload: {
          testing: 123
        }
      }
    ],
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
});

const ZERO = 0;
const mockLogProps = {
  mockserver: {
    log: [
      {
        timestamp: '7/10/2021 13:48:20',
        url: '/api/test',
        payload: {
          testing: 123
        }
      }
    ],
    message: {
      error: false,
      message: 'Successfully did stuff'
    }
  }
};

describe('MockLog', () => {
  it('checks page renders', async () => {
    reduxTestWrapper(MockLog, {}, mockLogProps);

    expect(screen.queryByText('Run Log must be set to yes in configuration')).toBeInTheDocument();

    await waitFor(() => expect(screen.queryByText(mockLogProps.mockserver.log[ZERO].timestamp)).toBeInTheDocument());
  });

  it('click clear log', async () => {
    api.get.mockResolvedValueOnce({
      data: {
        data: [],
        message: {
          message: 'test message'
        }
      }
    });
    act(() => {
      reduxTestWrapper(MockLog, {}, mockLogProps);
    });
    const clearBtn = screen.getByText('Clear Log');

    await waitFor(() =>
      expect(screen.queryByText(mockLogProps.mockserver.log[ZERO].timestamp)).not.toBeInTheDocument()
    );
  });

  it('click load then click copy content', async () => {
    document.execCommand = jest.fn();
    fullTestWrapper(MockLog, {}, mockLogProps);

    const loadBtn = screen.getByText('Load');
    fireEvent.click(loadBtn);

    await waitFor(() => expect(screen.queryByText('View Request Details')).toBeInTheDocument());

    const copyBtn = screen.getByText('Copy');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');

    act(() => {
      fireEvent.click(copyBtn);
    });
    const copyEl = appendChildSpy.mock.calls[ZERO][ZERO];

    expect(copyEl.value).toEqual('{\"testing\":123}');
    expect(document.execCommand).toHaveBeenCalled();
  });
});
