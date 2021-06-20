import React from 'react';
import './modal.css';

export const Modal = (props) => {
  const { title, message, children, action, close, buttonList = [] } = props;
  const renderButtons = buttonList.map(item => {
    const btnClass = item.primary ? 'modal__primary-btn': 'modal__secondary-btn';

    return (
      <button key={item.label} className={btnClass} onClick={item.action}>{item.label}</button>
    );
  });

  const renderBody = children ? children : (<div className="modal__body">{message}</div>);
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
        <button className="modal__close" onClick={close} aria-label="Close">X</button>
        {renderTitle}
        {renderBody}
        {renderFooter}
      </div>
    </div>
  );
};
