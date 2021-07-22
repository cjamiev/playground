import { fireEvent, screen } from '@testing-library/react';
import { reduxTestWrapper } from 'testHelper';
import { GlobalModal } from 'components/modal/GlobalModal';
import { closeGlobalModal } from './globalModalActions';

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
    const { container } = reduxTestWrapper(GlobalModal, {}, defaultStore, '/home', false);

    expect(container).toBeEmptyDOMElement();
  });

  it('click primary action', () => {
    reduxTestWrapper(GlobalModal, {}, storeWithPopulatedModalQueue, '/home', false);

    fireEvent.click(screen.getByText('Save'));

    expect(storeWithPopulatedModalQueue.globalModal.modalQueue[ZERO].buttonList[ZERO].action).toHaveBeenCalled();
  });

  it('click close', () => {
    reduxTestWrapper(GlobalModal, {}, storeWithPopulatedModalQueue, '/home', false);

    expect(screen.getByText(storeWithPopulatedModalQueue.globalModal.modalQueue[ZERO].message)).toBeInTheDocument();
    fireEvent.click(screen.getByText('X'));

    expect(screen.queryByText(storeWithPopulatedModalQueue.globalModal.modalQueue[ZERO].message)).not.toBeInTheDocument();
  });

  it('show loading', () => {
    reduxTestWrapper(GlobalModal, {}, storeWithLoading, '/home', false);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});