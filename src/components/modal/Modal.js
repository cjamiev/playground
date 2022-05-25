import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TextArea from 'components/form/TextArea';
import Button from 'components/button';
import { CloseSVG } from 'components/icons/CloseSVG';
import { noop } from 'helper/noop';
import { SCModal, SCModalHeader, SCModalTitle, SCModalBody, SCModalFooter } from './styles';

const Modal = (props) => {
  const dispatch = useDispatch();
  const { title, message, editable = false, dispatchAction, beforeClose = noop, close = noop, buttonList = [] } = props;
  const [content, setContent] = useState(message);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setContent(message);
  }, [message]);

  const renderButtons = buttonList.map((item) => {
    if (item.label) {
      return (
        <Button
          key={item.label}
          label={item.label}
          {...item.classProps}
          onClick={() => {
            item.action();
            beforeClose();
            close();
          }}
        />
      );
    }

    return null;
  });

  if (dispatchAction) {
    renderButtons.push(
      <Button
        key={dispatchAction.label}
        label={dispatchAction.label}
        disabled={err}
        classColor="secondary"
        onClick={() => {
          dispatch(dispatchAction.action(dispatchAction.parse(content)));
          beforeClose();
          close();
        }}
      />
    );
  }

  const handleChange = ({ selected, error }) => {
    setContent(selected);
    setErr(error);
  };

  const renderBody = editable ? (
    <SCModalBody className="scrollbar">
      <TextArea ariaLabel="Modal text area" selected={content} jsonType={true} onChange={handleChange} />
    </SCModalBody>
  ) : (
    <SCModalBody className="scrollbar">{content}</SCModalBody>
  );
  const renderTitle = (
    <SCModalHeader>
      <SCModalTitle>{title}</SCModalTitle>
    </SCModalHeader>
  );
  const renderFooter = <SCModalFooter>{renderButtons}</SCModalFooter>;

  return (
    <SCModal>
      <svg
        aria-label="Close"
        width="45"
        height="53"
        viewBox="0 0 53 53"
        onClick={() => {
          beforeClose();
          close();
        }}
      >
        <CloseSVG transform={'scale(0.5)'} />
      </svg>
      {renderTitle}
      {renderBody}
      {renderFooter}
    </SCModal>
  );
};

export default Modal;
