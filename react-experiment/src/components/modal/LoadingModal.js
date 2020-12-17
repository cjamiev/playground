import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeGlobalModal } from './globalModalActions';

import { Modal } from './Modal';

export const LoadingModal = () => {
  const { isLoading } = useSelector(state => state.globalModal);

  if(isLoading) {
    return (
      <Modal>
        <div className="spinner-border m-5" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Modal>
    );
  }

  return null;
};
