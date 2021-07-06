import { screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import { loadPassword } from './clipboardActions';
import Clipboard from './Clipboard';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const mockHistory = {
  location: {
    pathname: '/clipboard'
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
    passwords: [
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

const defaultStorePropsTwo = {
  ...defaultStoreProps,
  list: {
    commandResponse: 'test-command-response'
  },
  clipboard: {
    ...defaultStoreProps.clipboard,
    error: {
      message: 'test-message'
    }
  }
};

describe('Clipboard', () => {
  it('checks page renders', () => {
    testRenderContainer(Clipboard, defaultProps, defaultStoreProps);

    expect(screen.getByText('Clipboard')).toBeInTheDocument();
    expect(mockDispatch).toHaveBeenCalledTimes(3);
    expect(screen.getByText('label1')).toBeInTheDocument();
    expect(screen.getByText('username')).toBeInTheDocument();
    expect(screen.getByText('password')).toBeInTheDocument();
  });

  it('check error dispatch and commandResponse dispatch', () => {
    testRenderContainer(Clipboard, defaultProps, defaultStorePropsTwo);

    expect(mockDispatch).toHaveBeenCalledTimes(5);
  });
});