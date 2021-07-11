import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper';
import { GlobalModal } from 'components/modal/GlobalModal';
import { closeGlobalModal } from './globalModalActions';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
  return {
    __esModule: true,
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(() => mockDispatch)
  };
});

const ZERO = 0;

const defaultStore = {
  globalModal: {
    isLoading: false,
    modalQueue: []
  }
};
const storeWithPopulatedModalQueue = {
  globalModal: {
    isLoading: false,
    modalQueue: [{
      id: 0,
      title: 'test-title',
      message: 'test-message',
      buttonList: [
        {
          label: 'Save',
          action: jest.fn()
        }
      ]
    }]
  }
};
const storeWithLoading = {
  globalModal: {
    isLoading: true,
    modalQueue: []
  }
};

describe('GlobalModal', () => {
  it('empty modalQueue', () => {
    const { container } = testRenderContainer(GlobalModal, {}, defaultStore);

    expect(container).toBeEmptyDOMElement();
  });

  it('click primary action', () => {
    testRenderContainer(GlobalModal, {}, storeWithPopulatedModalQueue);

    fireEvent.click(screen.getByText('Save'));

    expect(storeWithPopulatedModalQueue.globalModal.modalQueue[ZERO].buttonList[ZERO].action).toHaveBeenCalled();
  });

  it('click close', () => {
    testRenderContainer(GlobalModal, {}, storeWithPopulatedModalQueue);

    fireEvent.click(screen.getByText('X'));

    expect(mockDispatch).toHaveBeenCalledWith(closeGlobalModal(ZERO));
  });

  it('show loading', () => {
    testRenderContainer(GlobalModal, {}, storeWithLoading);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});