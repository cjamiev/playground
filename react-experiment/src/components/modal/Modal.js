import React from 'react';

const modalStyle = {
  zIndex:'1',
  position: 'absolute',
  left: '50%'
};

export const Modal = (props) => {
  const { title, message, children, action, close, buttonList = [] } = props;
  const renderButtons = buttonList.map(item => {
    const btnClass = item.primary ? 'btn btn-primary': 'btn btn-secondary';

    return (
      <button key={item.label} type="button" className={btnClass} onClick={item.action}>{item.label}</button>
    );
  });

  const renderBody = children ?
    children :
    (<div className="modal-body">
      <p>{message}</p>
    </div>
    );
  const renderTitle = title ?
    (<div className="modal-header">
      <h5 className="modal-title">{title}</h5>
      <button type="button" className="btn-close" onClick={close} aria-label="Close"></button>
    </div>): null;
  const renderFooter = renderButtons.length ?
    (<div className="modal-footer">
      {renderButtons}
    </div>): null;

  return (
    <div style={modalStyle} className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div className="modal-dialog">
        <div className="modal-content">
          {renderTitle}
          {renderBody}
          {renderFooter}
        </div>
      </div>
    </div>
  );
};
