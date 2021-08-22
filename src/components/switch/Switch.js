import React from 'react';
import Button from 'components/button';
import './switch.css';
import { noop } from 'helper/noop';

const ZERO = 0;

const Switch = React.memo(({ data, switchIndex, onToggleSwitch = noop }) => {
  const renderSwitchs = data.map((item, itemIndex) => {
    const isActiveIndex = (switchIndex === itemIndex);
    const switchClass = isActiveIndex ? 'switch__item switch__item--active': 'switch__item';
    const ariaLabel = isActiveIndex ? `${item.label} mode is on` : `${item.label} mode is off`;

    return (
      <Button
        key={item.label}
        className={switchClass}
        label={item.label}
        ariaLabel={ariaLabel}
        onClick={ () => {
          onToggleSwitch(itemIndex);
        }} />
    );
  });

  return (
    <>
      <div className="switch">
        {renderSwitchs}
      </div>
    </>
  );
});

export default Switch;
