import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeGlobalModal } from './globalModalActions';

import { Modal } from './Modal';

const ZERO = 0;

export const GlobalModal = () => {
  const modalQueue = useSelector(state => state.globalModal.modalQueue);
  const { id, title, message, action } = modalQueue[ZERO] || {};
  const dispatch = useDispatch();

  const close = () => { dispatch(closeGlobalModal(id)); };
  const buttonList = [
    { primary: true, label: 'Save', action},
    { label: 'Close', action:close}
  ];

  return message ? <Modal title={title} message={message} action={action} close={close} buttonList={buttonList}/> : null;
};
