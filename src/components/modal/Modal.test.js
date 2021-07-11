import { fireEvent, screen } from '@testing-library/react';
import { testRenderComponent } from 'testHelper';
import { Modal } from 'components/modal/Modal';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const ZERO = 0;

const baseProps = {
  title: 'test-title',
  message: 'test-message',
  children: null,
  editable: true,
  dispatchAction: { label: 'dispatchAction', action: jest.fn(), parse: jest.fn() },
  beforeClose: jest.fn(),
  close: jest.fn(),
  buttonList: [
    {
      label: 'one',
      action: jest.fn()
    }
  ]
};

describe('Modal', () => {
  it('default', () => {
    testRenderComponent(Modal, baseProps);

    expect(screen.getByText(baseProps.title)).toBeInTheDocument();
    expect(screen.getByText(baseProps.message)).toBeInTheDocument();
  });

  it('handle close', () => {
    testRenderComponent(Modal, baseProps);

    fireEvent.click(screen.getByText('X'));

    expect(baseProps.beforeClose).toHaveBeenCalled();
    expect(baseProps.close).toHaveBeenCalled();
  });

  it('handle button action', () => {
    testRenderComponent(Modal, baseProps);

    fireEvent.click(screen.getByText(baseProps.buttonList[ZERO].label));

    expect(baseProps.buttonList[ZERO].action).toHaveBeenCalled();
  });

  it('handle dispatch action', () => {
    testRenderComponent(Modal, baseProps);

    fireEvent.click(screen.getByText(baseProps.dispatchAction.label));

    expect(baseProps.dispatchAction.action).toHaveBeenCalled();
    expect(baseProps.dispatchAction.parse).toHaveBeenCalledWith(baseProps.message);
  });

  it('handle dispatch action after text change', () => {
    testRenderComponent(Modal, baseProps);
    const input = screen.getByLabelText('text-area');
    const expectedResult = { id: 1, selected: '123', error: false };

    fireEvent.change(input, { target: { value: '123' } });
    fireEvent.click(screen.getByText(baseProps.dispatchAction.label));

    expect(baseProps.dispatchAction.parse).toHaveBeenCalledWith('123');
  });
});