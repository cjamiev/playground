import React from 'react';
import Button from 'components/button';
import { noop } from 'helper/noop';

const ZERO = 0;
const ONE = 1;

const Switch = React.memo(({ data, switchIndex, onToggleSwitch = noop }) => {
  const renderSwitchs = data.map((item, itemIndex) => {
    const isActiveIndex = switchIndex === itemIndex;
    const activeClass = isActiveIndex ? 'switch__item switch__item--active ' : 'switch__item ';
    const ariaLabel = isActiveIndex ? `${item.label} mode is on` : `${item.label} mode is off`;
    const firstClass = itemIndex === ZERO ? 'switch__item--first ': '';
    const lastClass = itemIndex === data.length - ONE ? 'switch__item--last': '';
    const switchClass = `${activeClass}${firstClass}${lastClass}`;

    return (
      <Button
        key={item.label}
        className={switchClass}
        label={item.label}
        ariaLabel={ariaLabel}
        onClick={() => {
          onToggleSwitch(itemIndex);
        }}
      />
    );
  });

  return (
    <>
      <div className="switch">{renderSwitchs}</div>
    </>
  );
});

export default Switch;
