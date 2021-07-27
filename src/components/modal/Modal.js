import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TextArea from 'components/form/TextArea';
import Button, { CloseButton } from 'components/button';
import './modal.css';
import { noop } from 'helper/noop';

const Modal = (props) => {
  const dispatch = useDispatch();
  const { title, message, editable = false, dispatchAction, beforeClose = noop, close = noop, buttonList = [] } = props;
  const [content, setContent] = useState(message);
  const [err, setErr] = useState(false);

  useEffect(() => {
    setContent(message);
  }, [message]);

  const renderButtons = buttonList.map(item => {
    if(item.label) {
      return (
        <Button key={item.label} label={item.label} {...item.classProps} onClick={() => { item.action(); beforeClose(); close(); } } />
      );
    }

    return null;
  });

  if(dispatchAction) {
    renderButtons.push(<Button key={dispatchAction.label} label={dispatchAction.label} disabled={err} className='modal__secondary-btn' onClick={() => { dispatch(dispatchAction.action(dispatchAction.parse(content))); beforeClose(); close();} } />);
  }

  const handleChange = ({ selected, error }) => {
    setContent(selected);
    setErr(error);
  };

  const renderBody = editable ? <div className="modal__body"><TextArea selected={content} jsonType={true} onChange={handleChange}/></div>: (<div className="modal__body">{content}</div>);
  const renderTitle = title ?
    (<div className="modal__header">
      <h2 className="modal__title">{title}</h2>
    </div>): null;
  const renderFooter = renderButtons.length ?
    (<div className="modal__footer">
      {renderButtons}
    </div>): null;

  return (
    <div className="modal">
      <CloseButton onClick={() => { beforeClose(); close();} } />
      {renderTitle}
      {renderBody}
      {renderFooter}
    </div>
  );
};

export default Modal;
