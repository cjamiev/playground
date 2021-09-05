import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/button';
import { createAlert, dismissAlert } from 'components/alert/alertActions';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import TestNew from './testnew';
import TestDynamicForm from './testdynamicform';
import TestDynamicWizard from './testwizard';
import TestGlobalModal from './testglobalmodal';
import { experimentGet, experimentPost } from './experimentActions';

const TABS = [
  { title: 'New', component: TestNew},
  { title: 'Global Modal', component: TestGlobalModal},
  { title: 'Dynamic Form', component: TestDynamicForm},
  { title: 'Wizard', component: TestDynamicWizard}
];

const TestApi = () => {
  const dispatch = useDispatch();
  const experimentData = useSelector(state => state.experiment);

  useEffect(() => {
    if(experimentData.value) {
      dispatch(createAlert({ content: JSON.stringify(experimentData), status: 'success' }));
    }
  }, [dispatch, experimentData]);

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