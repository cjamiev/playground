import { screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import { loadPassword } from './clipboardActions';
import Clipboard from './Clipboard';

const pathname = '/clipboard';
const ZERO = 0;

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
      message: 'test-alert-message2'
    }
  }
};

describe('Clipboard', () => {
  it('checks page renders', () => {
    reduxTestWrapper(Clipboard, defaultProps, defaultStoreProps, pathname);

    expect(screen.getAllByText('Clipboard')[ZERO]).toBeInTheDocument();
    expect(screen.getByText('label1')).toBeInTheDocument();
    expect(screen.getByText('username')).toBeInTheDocument();
    expect(screen.getByText('password')).toBeInTheDocument();
  });

  it('check error dispatch and commandResponse dispatch', () => {
    reduxTestWrapper(Clipboard, defaultProps, defaultStorePropsTwo, pathname);

    expect(screen.getByText(defaultStorePropsTwo.clipboard.error.message)).toBeInTheDocument();
  });
});