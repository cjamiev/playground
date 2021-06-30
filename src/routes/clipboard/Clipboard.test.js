import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import { loadClipboard } from './clipboardActions';
import Clipboard from './Clipboard';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const defaultProps = {};
const defaultStoreProps = {
  globalModal: {
    modalQueue: [{
      title: 'test-title',
      message: 'test-message',
      action: jest.fn()
    }]
  },
  clipboard: {
    error: {},
    value: [
      {
        'listTitle': 'listOne',
        'listData': [
          [
            {
              'label': 'label1',
              'type': 'link',
              'value': 'www.url1.com'
            },
            {
              'label': 'username',
              'type': 'copy',
              'value': 'user'
            },
            {
              'label': 'password',
              'type': 'copy',
              'value': 'password'
            }
          ]
        ]
      }
    ]
  }
};

describe('Clipboard', () => {
  it('checks page renders', () => {
    testRenderContainer(Clipboard, defaultProps, defaultStoreProps);

    expect(screen.getByText('Clipboard')).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalled();
    expect(screen.getByText('label1')).toBeInTheDocument();
    expect(screen.getByText('username')).toBeInTheDocument();
    expect(screen.getByText('password')).toBeInTheDocument();
  });
});