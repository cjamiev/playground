import React, { useState } from 'react';
import { formattedTimerClock } from 'clock';
import { useDispatch } from 'react-redux';
import { executeCommand } from './listActions';
import useTimer from 'hooks/useTimer';
import { copyToClipboard } from 'helper/copy';
import Button from 'components/button';
import { TYPE } from 'constants/type';
import './list.css';

const ONE = 1;

const getFormattedTime = ({ weeks, days, hours, minutes, seconds }) => {
  if (weeks > ONE) {
    return `${weeks} Weeks`;
  } else if (days > ONE) {
    return `${days} Days`;
  }

  return formattedTimerClock(hours, minutes, seconds);
};

export const DisplayTimer = ({ label, value }) => {
  const time = useTimer(new Date(value));

  return (
    <span className="list__item">
      <label className="list__timer-label" title={value}>
        {label}
      </label>
      <span data-testid={`${label} time`}>{getFormattedTime(time)}</span>
    </span>
  );
};

const DisplayCommand = ({ label, name, showArgs }) => {
  const dispatch = useDispatch();
  const [arg, setArg] = useState('');

  const handleChange = (event) => {
    setArg(event.target.value);
  };

  return (
    <span className="list__item">
      <Button
        classColor={'secondary'}
        label={label}
        onClick={() => {
          dispatch(executeCommand(name, arg));
        }}
      />
      {showArgs && <input type="text" aria-label={`args for ${label}`} onChange={handleChange} />}
    </span>
  );
};

export const DisplayContent = ({ type, label, value }) => {
  if (type === TYPE.TEXT) {
    return <span className="list__item">{value}</span>;
  } else if (type === TYPE.LINK) {
    return (
      <a className="link list__item" href={value} target="_blank">
        {label}
      </a>
    );
  } else if (type === TYPE.COPY) {
    return (
      <Button
        label={label}
        classColor="primary"
        onClick={() => {
          copyToClipboard(value);
        }}
      />
    );
  } else if (type === TYPE.COMMAND) {
    return <DisplayCommand label={label} name={value.name} showArgs={value.showArgs} />;
  } else if (type === TYPE.TIMER) {
    return <DisplayTimer label={label} value={value} />;
  }

  return null;
};

const List = React.memo(({ header, data, handleClick }) => {
  const renderContent = data.map((entry, index) => {
    const renderEntry = entry.map(({ type, label, value }) => {
      return <DisplayContent key={`${type}-${label}-${value}`} type={type} label={label} value={value} />;
    });

    const className = handleClick ? 'list__content clickable' : 'list__content';

    return (
      <div key={index} className={className} onClick={() => handleClick && handleClick(index, entry)}>
        {renderEntry}
      </div>
    );
  });

  return (
    <div className="list">
      {header && <div className="list__header">{header}</div>}
      {renderContent}
    </div>
  );
});

export default List;
