import React, { Fragment, useState } from 'react';

import Page from 'components/layout';
import Experiment from './experiment';
import TestDynamicForm from './testdynamicform';
import TestGlobalModal from './testglobalmodal';
import TestApi from './testapi';
import TestSwapSelect from './testswapselect';

const TABS = ['Experiment', 'Test Dynamic Form', 'Test Swap Select', 'Test Global Modal', 'Test Api'];
const ZERO = 0;
const ONE = 1;
const TWO = 2;
const THREE = 3;

const Home = () => {
  const [tabIndex, setTabIndex] = useState(TWO);
  const [error, setError] = useState('');
  const renderTabs = TABS.map((item, itemIndex) => {
    const tabClass = tabIndex === itemIndex ? 'tabs__item tabs__item--active': 'tabs__item';

    return (
      <li key={item} className={tabClass} aria-current="page" onClick={() => { setTabIndex(itemIndex); }} >
        {item}
      </li>
    );
  });


  const handleError = (message) => {
    setError(message);
  };

  const renderPage = () => {
    if(tabIndex === ZERO) {
      return (<Experiment handleError={handleError} />);
    }
    else if (tabIndex === ONE) {
      return (<TestDynamicForm />);
    }
    else if (tabIndex === TWO) {
      return (<TestSwapSelect />);
    }
    else if (tabIndex === THREE) {
      return (<TestGlobalModal />);
    }
    else {
      return (<TestApi />);
    }
  };

  return (
    <Page title={'Home'} error={error}>
      <ul className="tabs">
        {renderTabs}
      </ul>
      {renderPage()}
    </Page>
  );
};

export default Home;
