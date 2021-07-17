import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openGlobalModal } from 'components/modal/globalModalActions';
import Button from 'components/button';

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
            classProps: { classColor: 'primary' },
            action: getAction('test modalIndex:'+ modalIndex)
          },
          {
            label: 'two',
            classProps: { classColor: 'secondary' },
            action: getAction('test 2')
          },
          {
            label: 'three',
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
        <Button label="Open Modal" onClick={open} />
      </div>
    </>
  );
};

export default TestGlobalModal;
