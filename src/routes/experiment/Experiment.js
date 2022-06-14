import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'components/atoms/Button';
import { dismissAlert } from 'components/atoms/Alert/alertActions';
import Page from 'components/layout';
import Tabs from 'components/atoms/Tabs';
import TextArea from 'components/form/TextArea';
import Animation from './Animation';
import TestNew from './TestNew';
import DataGenerator from './DataGenerator';
import MockServer from './mockserver';
import Generator from './generator';
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
  { title: 'Style Guide', component: StyleGuide },
  { title: 'Svg', component: Svg },
  { title: 'Curve', component: SvgCurve },
  { title: 'Animation', component: Animation },
  { title: 'Modal', component: GlobalModal },
  { title: 'Wizard', component: Wizard },
  { title: 'Form', component: Form },
  { title: 'Mock Data', component: DataGenerator },
  { title: 'Mock Server', component: MockServer },
  { title: 'Generator', component: Generator }
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
