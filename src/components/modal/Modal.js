import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextArea from 'components/form/TextArea';
import './modal.css';
import { noop } from 'helper/noop';

export const Modal = (props) => {
  const dispatch = useDispatch();
  const { title, message, children, editable = false, dispatchAction, beforeClose = noop, close = noop, buttonList = [] } = props;
  const [content, setContent] = useState(message);
  const [err, setErr] = useState(false);
  const renderButtons = buttonList.map(item => {
    const btnClass = item.primary ? 'modal__primary-btn': 'modal__secondary-btn';

    return (
      <button key={item.label} className={btnClass} onClick={() => { item.action(); beforeClose(); close(); } }>{item.label}</button>
    );
  });

  if(dispatchAction) {
    renderButtons.push(<button key={dispatchAction.label} disabled={err} className='modal__secondary-btn' onClick={() => { dispatch(dispatchAction.action(dispatchAction.parse(content))); beforeClose(); close();} }>{dispatchAction.label}</button>);
  }

  const handleChange = ({ selected, error }) => {
    setContent(selected);
    setErr(error);
  };

  const renderBody = children ? children : editable ? <div className="modal__body"><TextArea selected={content} jsonType={true} onChange={handleChange}/></div>: (<div className="modal__body">{content}</div>);
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
      <div className="modal__container">
        <button className="modal__close" aria-label="Close" onClick={() => { beforeClose(); close();} }>X</button>
        {renderTitle}
        {renderBody}
        {renderFooter}
      </div>
    </div>
  );
};
