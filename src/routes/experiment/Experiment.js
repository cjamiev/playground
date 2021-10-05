import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/button';
import { createAlert, dismissAlert } from 'components/alert/alertActions';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import TextArea from 'components/form/TextArea';
import TestNew from './testnew';
import TestDataGen from './testdatagen';
import TestDynamicForm from './testdynamicform';
import TestDynamicWizard from './testwizard';
import TestGlobalModal from './testglobalmodal';
import { experimentGet, experimentPost } from './experimentActions';
import { noop } from 'helper/noop';

const TABS = [
  { title: 'Wizard', component: TestDynamicWizard },
  { title: 'New', component: TestNew },
  { title: 'Data Generator', component: TestDataGen },
  { title: 'Global Modal', component: TestGlobalModal },
  { title: 'Dynamic Form', component: TestDynamicForm }
];

const TestApi = () => {
  const dispatch = useDispatch();
  const experimentData = useSelector((state) => state.experiment);

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
      <TextArea selected={experimentData ? JSON.stringify(experimentData) : ''} jsonType={true} onChange={noop} />
    </div>
  );
};

const Experiment = () => {
  const dispatch = useDispatch();

  return (
    <Page sidePanelContent={TestApi()}>
      <Tabs
        data={TABS}
        onTabSwitch={() => {
          dispatch(dismissAlert());
        }}
      />
    </Page>
  );
};

export default Experiment;
