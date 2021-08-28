import React from 'react';
import { useDispatch } from 'react-redux';
import { dismissAlert } from 'components/alert/alertActions';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import TestNew from './testnew';
import TestAnimation from './testAnimation';
import TestRedux from './testredux';
import TestTodo from './testtodo';
import TestDynamicForm from './testdynamicform';
import TestDynamicWizard, { TestWizard } from './testwizard';
import TestGlobalModal from './testglobalmodal';
import TestApi from './testapi';

const TABS = [
  { title: 'New', component: TestNew},
  { title: 'Redux', component: TestRedux},
  { title: 'Animation', component: TestAnimation},
  { title: 'Global Modal', component: TestGlobalModal},
  { title: 'Todo', component: TestTodo},
  { title: 'Dynamic Form', component: TestDynamicForm},
  { title: 'Wizard', component: TestWizard},
  { title: 'DynamicWizard', component: TestDynamicWizard},
  { title: 'Api', component: TestApi}
];

const Experiment = () => {
  const dispatch = useDispatch();

  return (
    <Page sidePanelContent='Side Panel'>
      <Tabs data={TABS} onTabSwitch={() => { dispatch(dismissAlert());} }/>
    </Page>
  );
};

export default Experiment;