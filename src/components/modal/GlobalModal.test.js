import { fireEvent, screen } from '@testing-library/react';
import { testRenderContainer } from 'testHelper/componentSetup';
import { GlobalModal } from 'components/modal/GlobalModal';
import globalModalReducer from 'components/modal/globalModalReducer';

const defaultStoreProps = {
  globalModal: {
    modalQueue: [{
      title: 'test-title',
      message: 'test-message',
      action: jest.fn()
    }]
  }
};

describe('GlobalModal', () => {
  it('checks an item', () => {
    testRenderContainer(GlobalModal, {}, globalModalReducer, defaultStoreProps);

    fireEvent.click(screen.getByText('Save'));

    expect(defaultStoreProps.globalModal.modalQueue[0].action).toHaveBeenCalled();
  });
});