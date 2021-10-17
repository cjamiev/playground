import React, { useState } from 'react';
import { noop } from 'helper/noop';

const ZERO = 0;

const Tabs = React.memo(({ data, onTabSwitch = noop }) => {
  const [tabIndex, setTabIndex] = useState(ZERO);
  const TabComponent = data[tabIndex].component;

  const renderTabs = data.map((item, itemIndex) => {
    const tabClass = tabIndex === itemIndex ? 'tabs__item tabs__item--active' : 'tabs__item';

    return (
      <li
        key={item.title}
        className={tabClass}
        aria-current="page"
        onClick={() => {
          setTabIndex(itemIndex);
          onTabSwitch();
        }}
      >
        {item.title}
      </li>
    );
  });

  return (
    <>
      <ul className="tabs">{renderTabs}</ul>
      {<TabComponent />}
    </>
  );
});

export default Tabs;
