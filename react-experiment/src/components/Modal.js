import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from './modalActions';
import 'assets/modal.css';

export const Modal = (props) => {
  const { isOpen, title, message, action } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const close = () => dispatch(closeModal());
  if (isOpen) {
    return (
      <div className="modal-container">
        <header className="modal-header">{title}</header>
        <div className="modal-body">
          <div className="modal-content">{message}</div>
          <button className="modal-btns" onClick={action}>
            {' '}
            Action{' '}
          </button>
          <button className="modal-btns" onClick={close}>
            {' '}
            Close{' '}
          </button>
        </div>
      </div>
    );
  }

  return null;
};
