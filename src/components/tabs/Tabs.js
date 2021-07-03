import React, { useState } from 'react';
import './tabs.css';

const ZERO = 0;

const Tabs = React.memo(({ data = [] }) => {
  const [tabIndex, setTabIndex] = useState(ZERO);
  const TestComponent = data[tabIndex].component;

  const renderTabs = data.map((item, itemIndex) => {
    const tabClass = tabIndex === itemIndex ? 'tabs__item tabs__item--active': 'tabs__item';

    return (
      <li key={item.title} className={tabClass} aria-current="page" onClick={() => { setTabIndex(itemIndex); }} >
        {item.title}
      </li>
    );
  });

  return (
    <>
      <ul className="tabs">
        {renderTabs}
      </ul>
      {<TestComponent />}
    </>
  );
});

export default Tabs;
