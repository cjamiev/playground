import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeGlobalModal } from './globalModalActions';

import { Modal } from './Modal';

export const GlobalModal = () => {
  const { isOpen, title, message, action } = useSelector(state => state.globalModal);
  const dispatch = useDispatch();

  const close = () => { dispatch(closeGlobalModal()); };
  const buttonList = [
    { label: 'Close', action:close},
    { primary: true, label: 'Save', action}
  ];

  return isOpen ? <Modal title={title} message={message} action={action} close={close} buttonList={buttonList}/> : null;
};
