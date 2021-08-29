import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/button';
import { dismissAlert } from 'components/alert/alertActions';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import TestNew from './testnew';
import TestTodo from './testtodo';
import TestDynamicForm from './testdynamicform';
import TestDynamicWizard from './testwizard';
import TestGlobalModal from './testglobalmodal';
import { experimentGet, experimentPost } from './experimentActions';

const TABS = [
  { title: 'New', component: TestNew},
  { title: 'Global Modal', component: TestGlobalModal},
  { title: 'Todo', component: TestTodo},
  { title: 'Dynamic Form', component: TestDynamicForm},
  { title: 'Wizard', component: TestDynamicWizard}
];

const TestApi = () => {
  const [testData, setTestData] = useState('');
  const dispatch = useDispatch();
  const experimentData = useSelector(state => state.experiment);

  useEffect(() => {
    setTestData(experimentData && JSON.stringify(experimentData));
  }, [experimentData]);

  const runGet = () => {
    dispatch(experimentGet());
  };
  const runPost = () => {
    dispatch(experimentPost({ key: 'condition' }));
  };

  return (
    <div className="container--center">
      <Button label="Get Api" onClick={runGet} />
      <Button label="Post Api" onClick={runPost} />
      <div>{testData}</div>
    </div>
  );
};

const Experiment = () => {
  const dispatch = useDispatch();

  return (
    <Page sidePanelContent={TestApi()}>
      <Tabs data={TABS} onTabSwitch={() => { dispatch(dismissAlert());} }/>
    </Page>
  );
};

export default Experiment;