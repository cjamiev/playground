import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeGlobalModal } from './globalModalActions';

import { Modal } from './Modal';

const ZERO = 0;

export const GlobalModal = () => {
  const { isLoading, modalQueue } = useSelector(state => state.globalModal);
  const dispatch = useDispatch();
  const { id, title, message, action } = modalQueue[ZERO] || {};

  const close = () => { dispatch(closeGlobalModal(id)); };
  const buttonList = [
    { primary: true, label: 'Save', action},
    { label: 'Close', action:close}
  ];

  if(isLoading) {
    return (
      <Modal>
        <div className="modal__loading">Loading...</div>
      </Modal>
    );
  } else if (message) {
    return <Modal title={title} message={message} action={action} close={close} buttonList={buttonList}/>;
  }

  return null;
};
