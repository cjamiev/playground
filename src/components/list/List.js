import React from 'react';

const TYPE_LINK = 'link';
const TYPE_TEXT = 'text';
const TYPE_TIMER = 'timer';
const TYPE_COMMAND = 'command';
const TYPE_COPY = 'copy';

const copyToClipboard = (text) => {
  const copyText = document.createElement('textarea');
  copyText.value = text;
  document.body.appendChild(copyText);
  copyText.select();
  document.execCommand('copy');
  document.body.removeChild(copyText);
};

const getComponentByType = ({ type, label, value }) => {
  if(type === TYPE_TEXT) {
    return (<span>{value}</span>);
  } else if (type === TYPE_LINK) {
    return (<a className="link" href={value} target="_blank">{label}</a>);
  } else if (type === TYPE_COPY) {
    return (<button className="btn btn--primary" onClick={() => {copyToClipboard(value);}}>{label}</button>);
  }

  return null;
};

const List = React.memo(({ header, data = [] }) => {
  const renderContent = data.map(Entry => {
    const renderEntry = Entry.map(item => getComponentByType(item));

    return (
      <div className="list__content">
        {renderEntry}
      </div>
    );
  });

  return (
    <div className="list">
      <div className="list__header">{header}</div>
      {renderContent}
    </div>
  );
});

export default List;
