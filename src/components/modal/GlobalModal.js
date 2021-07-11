import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeGlobalModal } from './globalModalActions';

import { Modal } from './Modal';

const ZERO = 0;

export const GlobalModal = () => {
  const { isLoading, modalQueue } = useSelector(state => state.globalModal);
  const dispatch = useDispatch();
  const props = modalQueue[ZERO] || {};

  const close = () => { dispatch(closeGlobalModal(props.id)); };

  if(isLoading) {
    return (
      <Modal>
        <div className="modal__loading">Loading...</div>
      </Modal>
    );
  } else if (props.message) {
    return <Modal close={close} {...props} />;
  }

  return null;
};
