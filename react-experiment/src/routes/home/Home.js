import React, { Fragment, useState } from 'react';

import Page from 'components/layout';
import Experiment from './experiment';
import TestDynamicForm from './testdynamicform';
import TestGlobalModal from './testglobalmodal';
import TestApi from './testapi';

const TABS = ['Experiment', 'Test Dynamic Form', 'Test Global Modal', 'Test Api'];
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;

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
      return (<TestDynamicForm />);
    }
    else if (tabIndex === TWO) {
      return (<TestGlobalModal />);
    }
    else {
      return (<TestApi />);
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
