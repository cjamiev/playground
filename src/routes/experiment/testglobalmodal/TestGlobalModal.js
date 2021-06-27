import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openGlobalModal } from 'components/modal/globalModalActions';

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
    setModalIndex(previousModalIndex => previousModalIndex + ONE);
  };

  return (
    <>
      <div role="group">
        <button className="btn" onClick={open}>Open Modal</button>
      </div>
    </>
  );
};

export default TestGlobalModal;
