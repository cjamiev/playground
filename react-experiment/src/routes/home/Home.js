import React, { Fragment, useState } from 'react';

import Page from 'components/layout';
import Experiment from './Experiment';
import TestContainer from './TestContainer';
import TestDynamicForm from './TestDynamicForm';

const TABS = ['Experiment', 'Test Container', 'Test Dynamic Form'];
const ZERO = 0;
const ONE = 1;

const Home = () => {
  const [tabIndex, setTabIndex] = useState(ZERO);
  const renderTabs = TABS.map((item, itemIndex) => {
    const tabClass = tabIndex === itemIndex ? 'nav-link active': 'nav-link';

    return (
      <li key={item} className="nav-item" onClick={() => { setTabIndex(itemIndex); }} >
        <a className={tabClass} href="#" aria-current="page">{item}</a>
      </li>
    );
  });

  const renderPage = () => {
    if(tabIndex === ZERO) {
      return (<Experiment />);
    }
    else if (tabIndex === ONE) {
      return (<TestContainer />);
    }
    else {
      return (<TestDynamicForm />);
    }
  };

  return (
    <Page title={'Home'}>
      <ul className="nav nav-tabs">
        {renderTabs}
      </ul>
      {renderPage()}
    </Page>
  );
};

export default Home;
