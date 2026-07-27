import React from 'react';
import { useThemeContext } from '../../../context/ThemeProvider';
import { SCModalWrapper, SCModal, SCCloseBtn, SCModalHeader, SCModalTitle, SCModalBody, SCModalFooter } from './styles';

const Modal = ({ isModalVisible, title, message, close, buttonList = [] }) => {
  const { isLightMode } = useThemeContext();
  const renderButtons = buttonList.map((item, index) => {
    if (item.label) {
      return (
        <button
          autoFocus={index === 0}
          key={item.label}
          label={item.label}
          onClick={() => {
            item.action();
            close();
          }}
        >{item.label}
        </button>
      );
    }

    return null;
  });

  if (!isModalVisible) {
    return null;
  }

  return (
    <SCModalWrapper>
      <SCModal $islightmode={isLightMode}>
        <SCCloseBtn onClick={close} $islightmode={isLightMode}>X</SCCloseBtn>
        <SCModalHeader $islightmode={isLightMode}>
          <SCModalTitle>{title}</SCModalTitle>
        </SCModalHeader>
        <SCModalBody>{message}</SCModalBody>
        <SCModalFooter $islightmode={isLightMode}>{renderButtons}</SCModalFooter>
      </SCModal>
    </SCModalWrapper>
  );
};

export default Modal;