import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openGlobalModal } from 'components/modal/globalModalActions';

const ZERO = 0;
const ONE = 1;
const getModalTitle = (index) => `test-title-${index}`;
const getModalMessage = (index) => `test-message-${index}`;
const getAction = (message) => {
  return () => {
    alert(message);
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
        buttonList: [
          {
            label: 'one',
            primary: true,
            action: getAction('test modalIndex:'+ modalIndex)
          },
          {
            label: 'two',
            primary: true,
            action: getAction('test 2')
          },
          {
            label: 'three',
            primary: true,
            action: getAction('test 3')
          }
        ]
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
