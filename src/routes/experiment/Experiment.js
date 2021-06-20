import React, { Fragment, useState } from 'react';

import Page from 'components/layout';
import TestRedux from './testredux';
import TestTodo from './testtodo';
import TestDynamicForm from './testdynamicform';
import TestGlobalModal from './testglobalmodal';
import TestApi from './testapi';
import TestSwapSelect from './testswapselect';

const TABS = [
  { title: 'Redux', component: TestRedux},
  { title: 'Todo', component: TestTodo},
  { title: 'Dynamic Form', component: TestDynamicForm},
  { title: 'Swap Select', component: TestSwapSelect},
  { title: 'Global Modal', component: TestGlobalModal},
  { title: 'Api', component: TestApi}
];
const ZERO = 0;

const Experiment = () => {
  const [tabIndex, setTabIndex] = useState(ZERO);
  const [error, setError] = useState('');
  const TestComponent = TABS[tabIndex].component;

  const renderTabs = TABS.map((item, itemIndex) => {
    const tabClass = tabIndex === itemIndex ? 'tabs__item tabs__item--active': 'tabs__item';

    return (
      <li key={item.title} className={tabClass} aria-current="page" onClick={() => { setTabIndex(itemIndex); }} >
        {item.title}
      </li>
    );
  });

  const handleError = (message) => {
    setError(message);
  };


  return (
    <Page title={'Experiment'} error={error}>
      <ul className="tabs">
        {renderTabs}
      </ul>
      {<TestComponent handleError={handleError} />}
    </Page>
  );
};

export default Experiment;