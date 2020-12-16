import { fireEvent } from '@testing-library/react';
import { testRenderContainer } from 'testHelper/componentSetup';
import { Modal } from 'components/Modal';
import modalReducer from 'components/modalReducer';

const defaultStoreProps = {
  modal: {
    isOpen: true,
    title: 'test-title',
    message: 'test-message',
    action: jest.fn()
  }
};

describe('Modal', () => {
  it('checks an item', () => {
    const { getByText } = testRenderContainer(Modal, {}, modalReducer, defaultStoreProps);

    fireEvent.click(getByText('Save changes'));

    expect(defaultStoreProps.modal.action).toHaveBeenCalled();
  });
});