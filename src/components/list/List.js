import React, { useState } from 'react';
import { formattedTimerClock } from 'clock';
import { useDispatch } from 'react-redux';
import { executeCommand } from './listActions';
import useTimer from 'hooks/useTimer';
import './list.css';

const ONE = 1;

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

const getFormattedTime = ({ weeks, days, hours, minutes, seconds }) => {
  if(weeks > ONE) {
    return `${weeks} Weeks`;
  }
  else if (days > ONE) {
    return `${days} Days`;
  }

  return formattedTimerClock(hours,minutes,seconds);
};

const DisplayTimer = ({ label, value }) => {
  const time = useTimer(new Date(value));

  return (
    <div className="list__item">
      <label className="list__timer-label" title={value}>{ label }</label>
      <span>{ getFormattedTime(time) }</span>
    </div>
  );
};

const DisplayCommand = ({ label, mode, name, showArgs }) => {
  const dispatch = useDispatch();
  const [arg, setArg] = useState('');

  const handleChange = (event) => {
    setArg(event.target.value);
  };

  return (
    <div className="list__item">
      <button className="btn btn--secondary list__item" onClick={() => { dispatch(executeCommand(mode, name, arg)); }}>{label}</button>
      {showArgs &&<input type="text" onChange={handleChange} />}
    </div>
  );
};

const DisplayContent = ({ type, label, value }) => {

  if(type === TYPE_TEXT) {
    return (<span className="list__item">{value}</span>);
  } else if (type === TYPE_LINK) {
    return (<a className="link list__item" href={value} target="_blank">{label}</a>);
  } else if (type === TYPE_COPY) {
    return (<button className="btn btn--primary list__item" onClick={() => { copyToClipboard(value); }}>{label}</button>);
  } else if (type === TYPE_COMMAND) {
    return <DisplayCommand label={label} mode={value.mode} name={value.name} showArgs={value.showArgs} />;
  } else if (type === TYPE_TIMER) {
    return <DisplayTimer label={label} value={value} />;
  }

  return null;
};

const List = React.memo(({ header, data = [] }) => {
  const renderContent = data.map((entry, index) => {
    const renderEntry = entry.map(({ type, label, value }) => {
      return <DisplayContent key={`${type}-${label}-${value}`} type={type} label={label} value={value} />;
    });

    return (
      <div key={index} className="list__content">
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
