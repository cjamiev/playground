import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper, fullTestWrapper } from 'testHelper';
import { loadPassword } from './clipboardActions';
import Clipboard from './Clipboard';

const pathname = '/clipboard';
const ZERO = 0;

const defaultProps = {};
const defaultStoreProps = {
  clipboard: {
    error: {},
    clipboard: {
      passwords: [
        {
          title: 'listOne',
          data: [
            [
              {
                label: 'label1',
                type: 'link',
                value: 'www.url1.com'
              },
              {
                label: 'username',
                type: 'copy',
                value: 'user'
              },
              {
                label: 'password',
                type: 'copy',
                value: 'password'
              }
            ],
            [
              {
                label: 'label2',
                type: 'link',
                value: 'www.url1.com'
              },
              {
                label: 'username2',
                type: 'copy',
                value: 'user'
              },
              {
                label: 'password2',
                type: 'copy',
                value: 'password'
              }
            ]
          ]
        }
      ]
    }
  }
};

const defaultStorePropsTwo = {
  ...defaultStoreProps,
  list: {
    commandResponse: 'test-command-response'
  },
  clipboard: defaultStoreProps.clipboard
};

describe('Clipboard', () => {
  it('checks page renders', () => {
    reduxTestWrapper(Clipboard, defaultProps, defaultStoreProps, pathname);

    expect(screen.getAllByText('Clipboard')[ZERO]).toBeInTheDocument();
    expect(screen.getByText('label1')).toBeInTheDocument();
    expect(screen.getByText('username')).toBeInTheDocument();
    expect(screen.getByText('password')).toBeInTheDocument();
    expect(screen.getByText('label2')).toBeInTheDocument();
    expect(screen.getByText('username2')).toBeInTheDocument();
    expect(screen.getByText('password2')).toBeInTheDocument();
  });

  it('checks filter', () => {
    reduxTestWrapper(Clipboard, defaultProps, defaultStoreProps, pathname);

    const input = screen.getByLabelText('Filter by label text field');
    fireEvent.change(input, { target: { value: 'label2' } });

    expect(screen.queryByText('label1')).not.toBeInTheDocument();
    expect(screen.getByText('label2')).toBeInTheDocument();
  });

  it('commandResponse dispatch', () => {
    document.execCommand = jest.fn();
    fullTestWrapper(Clipboard, defaultProps, defaultStorePropsTwo, pathname);

    expect(screen.getByText(defaultStorePropsTwo.list.commandResponse)).toBeInTheDocument();
    const copyBtn = screen.getByText('Copy');
    const appendChildSpy = jest.spyOn(document.body, 'appendChild');
    fireEvent.click(copyBtn);

    const copyEl = appendChildSpy.mock.calls[ZERO][ZERO];
    expect(copyEl.value).toEqual('\"test-command-response\"');
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
});
