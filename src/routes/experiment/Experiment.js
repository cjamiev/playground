import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/button';
import { createAlert, dismissAlert } from 'components/alert/alertActions';
import Page from 'components/layout';
import Tabs from 'components/tabs';
import TextArea from 'components/form/TextArea';
import Animation from './Animation';
import TestNew from './TestNew';
import DataGenerator from './DataGenerator';
import Form from './Form';
import Wizard from './Wizard';
import GlobalModal from './GlobalModal';
import StyleGuide from './StyleGuide';
import Svg from './Svg';
import SvgCurve from './SvgCurve';
import { experimentGet, experimentPost } from './experimentActions';
import { noop } from 'helper/noop';

const TABS = [
  { title: 'New', component: TestNew },
  { title: 'Svg', component: Svg },
  { title: 'SvgCurve', component: SvgCurve },
  { title: 'Animation', component: Animation },
  { title: 'Data Generator', component: DataGenerator },
  { title: 'Global Modal', component: GlobalModal },
  { title: 'Wizard', component: Wizard },
  { title: 'Dynamic Form', component: Form },
  { title: 'Style Guide', component: StyleGuide }
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
