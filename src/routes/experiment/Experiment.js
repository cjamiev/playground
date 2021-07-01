import React, { useState } from 'react';

import Page from 'components/layout';
import Tabs from 'components/tabs';
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

const Experiment = () => {
  const [error, setError] = useState('');

  const handleError = (message) => {
    setError(message);
  };

  return (
    <Page title={'Experiment'} error={error}>
      <Tabs data={TABS} handleError={handleError} />
    </Page>
  );
};

export default Experiment;