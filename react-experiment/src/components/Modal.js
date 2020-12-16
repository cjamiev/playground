import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from './modalActions';
import 'assets/modal.css';

const modalStyle = {
  zIndex:'1',
  position: 'absolute',
  left: '50%'
};

export const Modal = (props) => {
  const { isOpen, title, message, action } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const close = () => dispatch(closeModal());
  if (isOpen) {
    return (
      <div style={modalStyle} className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={close} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>{message}</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={close}>Close</button>
              <button type="button" className="btn btn-primary" onClick={action}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
