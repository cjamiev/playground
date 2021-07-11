import React from 'react';
import { useDispatch } from 'react-redux';
import { dismissAlert } from 'components/alert/alertActions';
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
  { title: 'Global Modal', component: TestGlobalModal},
  { title: 'Todo', component: TestTodo},
  { title: 'Dynamic Form', component: TestDynamicForm},
  { title: 'Swap Select', component: TestSwapSelect},
  { title: 'Api', component: TestApi}
];

const Experiment = () => {
  const dispatch = useDispatch();

  return (
    <Page>
      <Tabs data={TABS} onTabSwitch={() => { dispatch(dismissAlert());} }/>
    </Page>
  );
};

export default Experiment;