import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { openGlobalModal, showLoadingModal } from 'components/modal/globalModalActions';

const ZERO = 0;
const ONE = 1;
const getModalTitle = (index) => `test-title-${index}`;
const getModalMessage = (index) => `test-message-${index}`;
const getAction = (index) => {
  return () => {
    alert('test '+ index);
  };
};

const TestGlobalModal = () => {
  const [modalIndex, setModalIndex] = useState(ZERO);
  const dispatch = useDispatch();

  const open = () => {
    dispatch(
      openGlobalModal({
        title: getModalTitle(modalIndex),
        message: getModalMessage(modalIndex),
        action: getAction(modalIndex)
      })
    );
    setModalIndex(modalIndex + ONE);
  };

  return (
    <Fragment>
      <div className="btn-group mr-2" role="group" aria-label="First group">
        <button className="btn btn-primary" onClick={open}>Open Modal</button>
      </div>
    </Fragment>
  );
};

export default TestGlobalModal;
